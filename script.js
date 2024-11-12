const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "sk-proj-o93fpXrIomHQhh7oQQlUT3BlbkFJhqIRmGkJJK6pukwdVo77";
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.array.forEach((imgObject, index) => {
         const imgCard = imageGallery.querySelectorAll(".img-card")[index];
         const imgElement = imgCard.querySelector("img");
         const downloadBtn = imgCard.querySelector(".download_btn");

         //set image to the source to the generated image data
         const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
         imgElement.src = aiGeneratedImg

         //when the image is loaded, remove the loading class
         imgElement.onland = () => {
            imgCard.classList.remove("loading");// Variables
const promptBar = document.querySelector("#prompt_bar");
const imageresult = document.querySelector("#image_result");
const downloadBtn =  document.querySelector(".download-btn");

// Replace 'your-api-key' with your actual OpenAI API key
const openaiAPIKey = "your-api-key";
let isImgGen = false;

// Function to update image boxes with generated images
const updateImgBoxes = (imgBoxArray) => {
    imgBoxArray.forEach((imgObject, index) => {
        const imgBox = imageresult.querySelectorAll(".img_box")[index];              
        const imgElement = imgBox.querySelector("img");
        const downloadBtn = imgBox.querySelector(".download-btn");

        const aiImgGenerate = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiImgGenerate;

        imgElement.onload = () => {
            imgBox.classList.remove("loading");
            downloadBtn.setAttribute("href", aiImgGenerate);
            downloadBtn.setAttribute("download", `Cosas_Learning_${new Date().getTime()}.jpg`);
        }
    })
}

// Function to generate AI images
const  generateAIImages = async (userPrompt, imgQuntity, imgSize) => {
     try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiAPIKey}`
            },
            body:JSON.stringify({
                prompt : userPrompt,
                n: parseInt(imgQuntity),
                size : imgSize,
                response_format :"b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate AI Images! Please try again.")

        const { data } = await response.json();
        console.log(data);
        updateImgBoxes([...data]);
     } catch (error) {
        alert(error.message);
        imageresult.style.display = "none";
     } finally {
        isImgGen = false;
     }
}

// Function to handle the form submission
const handlePrompt = (e) => {
    e.preventDefault();
    if(isImgGen) return;
    isImgGen = true;

    imageresult.style.display = "flex";
    
    const userPrompt = e.srcElement[0].value;
    const imgQuntity = e.srcElement[1].value;
    const imgSize = e.srcElement[2].value;

     // Create loading placeholders for images
    const imgBoxes = Array.from({length: imgQuntity}, () => 
     `<div class="img_box loading">
        <img src="images/loader.gif">
        <a href="#" class="download-btn">
        <i class="fa-solid fa-download"></i>
        </a>
     </div>`
    ).join("");

    imageresult.innerHTML = imgBoxes;
    generateAIImages(userPrompt, imgQuntity, imgSize);
    
}

// Add event listener for form submission
promptBar.addEventListener("submit", handlePrompt);
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new data().getTime()}.jpg`);
         }
    });
}

const generateAiImages = async (userPrompt, userImgQuantity) => {
    try{
        // sent request to OPENAI to generate image
       const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            prompt: userPrompt,
            n: parseInt(userImgQuantity),
            size: "512x512",
            response_format: "b64_json" 
        })
       });

       if(!response.ok) throw new Error("Failed To Generate Images! Please try Again."); 



    const{ data } = await response.jeson(); //get data from the response  
       updateImageCard([...data]);
    }catch(error){
        alert(error.message);
    }finally{
        isImageGenerating = false;
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerating) return;
    isImageGenerating = true;


  //get user input And image quantity values from the form
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // creating HTML markup for Image Cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
       `<div class="img-card loading">
          <img src="image/loader.svg" alt="image" >
              <a href="#" class="download-btn">
                <img src="image/download.svg" alt="downloard icon">
              </a>
        </div>` 
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);

