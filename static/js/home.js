window.addEventListener("load", () => {

    let leads = JSON.parse(localStorage.getItem('mail-leads'));
    console.log(leads.data)

    if (!leads) {
        // Handle the case when leads is null or undefined
        alert(" Session expired. Please upload the file again.")
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

        sendEmailBtn.addEventListener('click', async (e) => {

            if (lead.email) {
                const response = await fetch(`/send-email/${lead.firstname}/${lead.company}/${lead.email}/`)
                const data = await response.json();
                alert(data.status)
            }
            else {
                alert("Email not found")
            }

        })

        leadItem.appendChild(sendEmailBtn);
        document.getElementById('lead-list').appendChild(leadItem);
    })
})