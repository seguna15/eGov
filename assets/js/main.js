const minOfHealth = document.querySelector(".minOfHealth");
const minOfEducation = document.querySelector(".minOfEducation");
const minOfJustice = document.querySelector(".minOfJustice");
const minOfPower = document.querySelector(".minOfPower");
const minOfAgric = document.querySelector(".minOfAgric");
const minOfHousing = document.querySelector(".minOfHousing");
const minOfInformation = document.querySelector(".minOfInformation");
const minOfInterior = document.querySelector(".minOfInterior");
const ninEl = document.querySelector('.nin');
const resultEl = document.querySelector(".result");

const minArrays = [ minOfHealth, minOfEducation, minOfJustice, minOfPower, minOfAgric, minOfHousing, minOfInformation, minOfInterior ];


minArrays.forEach( min => {
    min.addEventListener("click", () => {
      resultEl.innerHTML = "";
      const nin = ninEl.value;

      let fetch = async () => {
        try {
          let res = await axios.post(`/api/${min.id}/${nin}`);
          let result = res.data.result;
          resultEl.innerHTML = JSON.stringify(result, null, 2);
        } catch (error) {
          resultEl.innerHTML = "Result Not Found";
        }
      };
      fetch();
    });

})



/*  let payload = { name: 'John Doe', occupation: 'gardener' };

    let res = await axios.post('http://httpbin.org/post', payload);

    let data = res.data;
    console.log(data); */