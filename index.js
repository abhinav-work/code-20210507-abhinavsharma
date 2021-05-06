const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json())

const defaultInput = [
    { "Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, 
    { "Gender": "Male", "HeightCm": 161, "WeightKg": 85 }, 
    { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, 
    { "Gender": "Female", "HeightCm": 166, "WeightKg": 62 }, 
    { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 }, 
    { "Gender": "Female", "HeightCm": 167, "WeightKg": 82 }
];

const overWeightIndex = 2;

const BMICategoryMapper = {
    Under_Weight: 18.4,
    Normal_Weight: 24.9,
    Over_Weight: 29.9,
    Moderately_Obese: 34.9,
    Severely_Obese: 39.9,
    Very_Severely_Obese: 40,
}

const BMIHealthRiskMapper = {
    Under_Weight: 'Malnutrition',
    Normal_Weight: 'Low Risk',
    Over_Weight: 'Enhanced Risk',
    Moderately_Obese: 'Medium Risk',
    Severely_Obese: 'High Risk',
    Very_Severely_Obese: 'Very High Risk',
}

//ROUTES
app.post('/', async(req, res, next) => {
    try {
        let rawData = ((req.body || { }).input || []);
        let totalOverWeightPeople = 0;

        if(!req.query.defaultInput && !rawData.length) {
            return res.send({ code: 422, message: "Please provide valid input" });
        }

        if(req.query.defaultInput) rawData = defaultInput;
            
        rawData.forEach(data => {
            if(!data.WeightKg || !data.HeightCm) {
                return res.send({ code: 422, message: `Missing key WeightKg or HeightCm` })
            }
            data.BMI = Number(((Number(data.WeightKg) && Number(data.HeightCm)) ? (Number(data.WeightKg) / ((Number(data.HeightCm) * Number(data.HeightCm)) / 10000)) : 0).toFixed(1));
            let categoryAndHealthRiskIndex = (data.BMI <= 0 ? 0 : Object.values(BMICategoryMapper).findIndex(bmiValueLowerBound => bmiValueLowerBound >= data.BMI));
            categoryAndHealthRiskIndex = (categoryAndHealthRiskIndex > -1 ? categoryAndHealthRiskIndex : Object.keys(BMICategoryMapper).length-1);
            data.BMICategory = (Object.keys(BMICategoryMapper)[categoryAndHealthRiskIndex] || "").split('_').join(' ');
            data.HealthRisk = (Object.values(BMIHealthRiskMapper)[categoryAndHealthRiskIndex] || "");
            totalOverWeightPeople = categoryAndHealthRiskIndex === overWeightIndex ? ++totalOverWeightPeople : totalOverWeightPeople;
        });
        res.send({ code: 200, message: 'Success', data: { totalOverWeightPeople, list: rawData } });
        next();
    }
    catch(err) {
        next();
    }
});


app.listen(3000, () => {
	console.log('Server is running @ 3000')
})

module.exports = {
    app
}