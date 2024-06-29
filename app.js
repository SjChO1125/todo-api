import express  from "express";
import tasks from './data/mock.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import Task from './models/Task.js';
import cors from 'cors';
// ...

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to DB'));




const app = express();
const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'https://my-todo.com'],
  };
  
app.use(cors(corsOptions));
app.use(express.json());

function asyncHandler(handler){
    return async function (req,res){
        try{
            await handler(req,res);
            

        }catch(e){
            if(e.name==='ValiationError'){
                res.status(400).send({message:e.message});

            }else if(e.name==='CastError'){
                res.status(404).send({message:"Cannot find given id."});

            }else{
                res.status(500).send({message:e.message});
            }

        }
    }
}



app.get('/tasks', asyncHandler(async(req, res) => {
  /** 쿼리 파라미터
	 *  - sort: 'price'인 경우 높은 요금순, 그 외의 모든 경우 최신으로 생성된 순서
	 */
  const sort = req.query.sort;

  const compareFn =
    sort === 'price'
      ? (a, b) => b.price - a.price
      : (a, b) => b.createdAt - a.createdAt;

  res.send(subscriptions.sort(compareFn));
}));

app.get('/tasks/:id', asyncHandler(async(req, res) => {
  const id =req.params.id;
  const task = Task.findById(id);
  if (subscription) {
    res.send(subscription);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

function getNextId(arr) {
  const ids = arr.map((task) => task.id);
  return Math.max(...ids) + 1;
}

app.post('/tasks', asyncHandler(async (req, res) => {
  const newTask = await Task.create(req.body);
  const ids=mockTasks.map((task)=>task.id);

  subscriptions.push(newTask);
  res.status(201).send(newTask);
}));

app.patch('/subscriptions/:id',asyncHandler(async (req, res) => {
    const id =req.params.id;
    const task = Task.findById(id);

  if (task) {
    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    await task.save();
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));

// 여기에 코드를 작성하세요.
app.delete('/subscriptions/:id', asyncHandler(async(req, res) => {
  const id = Number(req.params.id);
  const task=await Task.findByIdAndDelete(id);
  if (task) {
    subscriptions.splice(subscriptionIndex, 1);
    res.sendStatus(204); // No content success status response code
  } else {
    res.status(404).json({ message: 'Cannot find given id.' });
  }
}));

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

//3000:포트번호 나머지 뒷부분은 콜백. 실행되는 부분
//->브라우저로 접속하면 get 리퀘스트 보냄. 근데 이렇게 하면 get 리퀘스트만 보낼 수 있는 한계
//->그래서 rest client 설치한거임



