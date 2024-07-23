window.addEventListener("load", () => {

    let leads = JSON.parse(sessionStorage.getItem('leads'));
    console.log(leads.data)

    if (!leads) {
        // Handle the case when leads is null or undefined
        alert(" Session expired or no leads found. Please upload the file")

        window.location.href = '/'; //Redirecting to form page
    }

    leads.data.forEach(lead => {
        const leadItem = document.createElement('div');
        leadItem.classList.add('lead-item');

        const leadInfo = document.createElement('div');
        leadInfo.classList.add('lead-info')
        leadInfo.appendChild(document.createElement('h2')).textContent = lead.firstname;

        const leadDetail = document.createElement('div');
        leadDetail.classList.add('lead-detail');

        Object.entries(lead).forEach(([key, value]) => {
            if (key != 'firstname') {
                const p = document.createElement('p')
                p.classList.add('lead-detail-item');
                p.innerHTML = `<b>${key}:</b> ${value}`

                leadDetail.appendChild(p);
            }
        });

        leadInfo.appendChild(leadDetail)
        leadItem.appendChild(leadInfo);

        //Creating send email button
        const sendEmailBtn = document.createElement('button');
        sendEmailBtn.classList.add('send-email-btn');
        sendEmailBtn.textContent = 'Send Email';

        sendEmailBtn.addEventListener("click", () => {
            const overlay = document.getElementById('overlay')
            overlay.style.display = 'block'

            const emailBody = document.getElementById('email-body')
            const emailForm = document.getElementById('email-form')
            emailBody.innerHTML = `Dear ${lead.firstname},

I am writing to express my interest in Software Engineering opportunities at ${lead.company}. I recently graduated with a degree in Electrical and Electronics Engineering, but my passion for technology led me to pursue additional skills in Python, Django, and JavaScript.

While my academic background is in a different field, I am confident that my technical skills and eagerness to learn make me a suitable candidate for a Software Engineering role. I am a quick learner and have a strong foundation in problem-solving and analytical thinking.

I am excited about the prospect of contributing my skills and knowledge to your team and am eager to learn more about the opportunities available. I have attached my resume for your review, and I would welcome the chance to discuss my qualifications further.

Thank you for your time and consideration. I look forward to hearing from you soon.

Best regards,
Saisrinu Gampa
`
            emailForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = lead.email;
                const name = lead.firstname;
                const company = lead.company;

                if (!email) {
                    alert("Email not found")
                    overlay.style.display = 'none'
                } else {

                    try {
                        const response = await fetch(`http://127.0.0.1:8000/send-email/${name}/${company}/${email}`);
                        const data = await response.json();
                        overlay.style.display = 'none'
                        alert(data.status);
                    } catch (error) {
                        alert('Error sending email');
                    }
                }

            });
        })

        leadItem.appendChild(sendEmailBtn);

        document.getElementById('lead-list').appendChild(leadItem);
    })
})

const closeBtn = document.getElementById('closePopup')
closeBtn.addEventListener('click', () => {
    const overlay = document.getElementById('overlay')
    overlay.style.display = 'none'
})