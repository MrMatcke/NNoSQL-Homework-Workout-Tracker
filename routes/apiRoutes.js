const router = require("express").Router();
const db = require("./models");

//create new workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//add exercises
router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body.duration);
    db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
            
        },
        {
            new: true,
            upsert: true
        }
    ).then(updatedWorkout => {
        console.log(updatedWorkout);
        res.json(updatedWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
