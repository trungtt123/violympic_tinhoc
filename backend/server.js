const express = require("express");
const bodyParser = require("body-parser");
var app = express();
require('./db/connection');
var cors = require('cors');
const user = require('./controllers/user');
const school = require('./controllers/school');
const exam = require('./controllers/exam');
const problem = require('./controllers/problem');
const submission = require('./controllers/submission');
const examresult = require('./controllers/examresult');
const http = require('http'); // CORE MODULE, USED TO CREATE THE HTTP SERVER
const server = http.createServer(app); // CREATE HTTP SERVER USING APP
const port = process.env.PORT || '6969';
const MessageReport = require('./repositories/messagereportexam');
const Message = require('./repositories/message');
const User = require("./repositories/user");
const Exam = require("./repositories/exam");
const io = require("socket.io")(server, {
	cors: {
		origin: "https://violympic-tinhoc.web.app",
		//origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT"]
	}
});

io.on('connection', (socket) => {
	socket.on('reportExam', async (data) => {
		const currentExam = data.exam;
		var mainRoomReport = 'mainRoomReport' + currentExam.examInfomation.isCreatedBy;
		socket.join(mainRoomReport);
		if (data.message !== "") {
			await MessageReport.UserJoinMessageReport(data.userID, currentExam.messageReportExam._id);
			await MessageReport.AddMessage(data.userID, currentExam.messageReportExam._id, data.problemName, data.message);
			const messageReport = await MessageReport.GetMessageReport(currentExam.examInfomation._id);
			socket.to(mainRoomReport).emit('createdUserReceiveReport', { examID: currentExam.examInfomation._id, messageReport });
		}
	});
	socket.on('getAllMessages', async (data) => {
		const userID = data.userID;
		const roomGetAllMessages = 'getAllMessages' + userID;
		const gotAllMessages = await Message.GetAllMessage(userID);
		socket.join(roomGetAllMessages);
		io.in(roomGetAllMessages).emit('gotAllMessages' , gotAllMessages);
	});
	socket.on('getMessageByID', async (data) => {
		const messageID = data.messageID;
		console.log(messageID);
		const roomGetMessageByID = 'getMessage' + messageID;
		const messages = await Message.GetMessageByID(messageID);
		socket.join(roomGetMessageByID);
		io.in(roomGetMessageByID).emit('gotMessageByID', messages);
	});
	socket.on('clientSendMessage' ,async (data) => {
		console.log(data);
		const messageID = data.messageID;
		const userID = data.userID;
		const message = data.message;
		const res = await Message.AddMessage(userID, messageID, message);
		const roomGetMessageByID = 'getMessage' + messageID;
		socket.join(roomGetMessageByID);
		io.in(roomGetMessageByID).emit('gotMessageByID', res);
	});
	socket.on('clientCreateMessage', async(data)=>{
		console.log(data);
		const listUsers = data.listUsers;
		const userID = data.userID;
		const message = await Message.CreateMessage(listUsers);
		const user = await User.getUserByID(userID);
		var messageName = '';
		for (var i = 0; i < user.messages.length;i++){
			if (JSON.stringify(user.messages[i].messageID) === JSON.stringify(message._id)) {
				messageName = user.messages[i].messageName;
				break;
			}
		}
		const roomGetMessageByID = 'getMessage' + message._id;
		socket.join(roomGetMessageByID);
		io.in(roomGetMessageByID).emit('isCreatedMessage', {message, messageName});
	})
	socket.on('disconnect', () => {
		console.log('user disconneted ' + socket.id);
	})
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/search/:keyword', async(req, res) => {
	var users = await User.GetAllUser(req.params.keyword);
	var exams = await Exam.GetAllExamForSearch(req.params.keyword);
	res.status(200).json({users, exams});
})
app.all('/examresult/*', (req, res, next) => {
	examresult(app);
	next();
});
app.all('/user/*', (req, res, next) => {
	user(app);
	next();
});
app.all('/submission/*', (req, res, next) => {
	submission(app);
	next();
});
app.all('/problem/*', (req, res, next) => {
	problem(app);
	next();
});
app.all('/school/*', (req, res, next) => {
	school(app);
	next();
});
app.all('/exam/*', (req, res, next) => {
	exam(app);
	next();
});


app.set('port', port);

// LISTEN ON SPECIFIED PORT
server.listen(port);

// LOG WHICH PORT THE SERVER IS RUNNING ON
console.log('Server listening on port ' + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500).send(err.stack);
});

module.exports = app;