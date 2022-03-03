const express = require('express');
const morgan = require('morgan')
const fs = require('fs');
const app = express();

// 1) Middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) =>{
    console.log('Hello from the middleware');
    next();
})

app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

// 2) Routes
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const getAllTours = (req, res) =>{
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) =>{
    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
        
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

const createTour = (req, res) =>{
    //console.log(req.body);

    const newId = tours[tours.length-1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) =>{
    if(req.params.id*1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
        
    }
    res.status(200).json({
        status: 'success',
        data:{
            tour: 'Tour updated'
        }
    })
}

const deleteTour = (req, res) =>{
    if(req.params.id*1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        })
        
    }
    res.status(204).json({
        status: 'success',
        data:null
    })
}

const getAllUsers = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route not yet implemented'

    })
}

const createUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route not yet implemented'

    })
}

const getUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route not yet implemented'

    })
}

const updateUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route not yet implemented'

    })
}

const deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'Route not yet implemented'

    })
}

// 3) HTTP Methods

const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

tourRouter.route('/')
.get(getAllTours)
.post(createTour)

tourRouter.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

userRouter.route('/')
.get(getAllUsers)
.post(createUser)

userRouter.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

// 4) Server listen
const port = 3000;
app.listen(port, () =>{
    console.log(`App running on port ${port}...`)
})
