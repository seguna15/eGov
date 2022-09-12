const express = require('express');
const route = express.Router();

let userAccounts = require('./userDB');
let citizensData = require('./citizenDB');

const menu = [
    {
        name: 'Home',
        url: '/',
        icon: 'ri-arrow-drop-right-line'
    },
    {
        name: "Ministry",
        url: "/ministry",
        icon: "ri-arrow-drop-right-line",
    },
    {
        name: "Sector",
        url: "#",
        icon: "ri-arrow-drop-right-line",
    },
    {
        name: "Agency",
        url: "/agency",
        icon: "ri-arrow-drop-right-line",
    },
    {
        name: "State",
        url: "#",
        icon: "ri-arrow-drop-right-line",
    },
    {
        name: "Statistic",
        url: "#",
        icon: "ri-arrow-drop-right-line",
    },
];

route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/login", (req, res) => {
  const checkEmail = userAccounts.find(
    (userAccount) => userAccount.email === req.body.email
  );
  const checkPassword = userAccounts.find(
    (userAccount) => userAccount.password === req.body.password
  );

  if (checkEmail && checkPassword) {
    req.session.user = req.body.email;
    res.redirect("/");
  } else {
    res.end("Unable to login check email and password");
  }
});

route.get("/", (req, res) => {
    
    if(req.session.user){
        let data = {
          title: "Home",
          url: req.url,
          menu: menu,
          user: req.session.user,
        };
        res.render("index", data);
    }
    else{
        res.redirect('/login');
    }
    
});

route.get("/ministry", (req, res) => {
    
    if (req.session.user) {
        let data = {
            title: "Ministry",
            url: req.url,
            menu: menu,
            user: req.session.user,
        };
        res.render("ministry", data);
    } else {
        res.redirect("/login");
    }
    
});

route.get('/agency', (req, res) => {
    if (req.session.user) {
      let data = {
        title: "Agency",
        url: req.url,
        menu: menu,
        user: req.session.user,
      };
        res.render("agency", data);
    } else {
        res.redirect("/login");
    }
});

route.post('/api/minOfHealth/:nin', (req, res) => {
    let nationaID = req.params.nin;
    let checkNIN = citizensData.find( citizen => citizen.generalData.nin === nationaID);
    
    if(!checkNIN)
    {
      res.json({ result: "Data does not exist for this NIN" });
      return;
    }

    let result = {
      generalData: checkNIN.generalData,
      ministryofHealthData: checkNIN.minOfHealth,
    };
    res.json({result: result});
});

route.post("/api/minOfEducation/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofEducationData: checkNIN.minOfEduc,
  };
  res.json({ result: result });
});

route.post("/api/minOfJustice/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofJusticeData: checkNIN.minofJustice,
  };
  res.json({ result: result });
});

route.post("/api/minOfPower/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofPowerData: checkNIN.minOfPower,
  };
  res.json({ result: result });
});

route.post("/api/minOfAgric/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofAgricData: checkNIN.minofAgric,
  };
  res.json({ result: result });
});

route.post("/api/minOfHousing/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofHousingData: checkNIN.minofHousing,
  };
  res.json({ result: result });
});

route.post("/api/minOfInformation/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofinformationData: checkNIN.minofInformation,
  };
  res.json({ result: result });
});

route.post("/api/minOfInterior/:nin", (req, res) => {
  let nationaID = req.params.nin;
  let checkNIN = citizensData.find(
    (citizen) => citizen.generalData.nin === nationaID
  );

  if (!checkNIN) {
    res.json({ result: "Data does not exist for this NIN" });
    return;
  }

  let result = {
    generalData: checkNIN.generalData,
    ministryofinteriorData: checkNIN.minofInterior,
  };
  res.json({ result: result });
});

//logout route
route.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            let data = {
              title: "Login",
              logout: "Logout successfully...!",
            };
            res.render('login', data);
        }
    });
})






module.exports = route;