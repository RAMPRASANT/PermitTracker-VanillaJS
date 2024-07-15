import "./style.scss";
import permitDetails from './data.json';

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const permitId = urlParams.get('permitId')
const filteredDetails = permitDetails?.filter((permit) => (
    permit.id === parseInt(permitId, 10)
))

// Reading the fields from the DOM to populate the results
let applicantName = document.getElementById('userName')
let address = document.getElementById('address')
let email = document.getElementById('mail')
let phoneNumber = document.getElementById('phone')
let contractorName = document.getElementById('contractor')

let propertyAddress = document.getElementById('propertyAddress')
let lot = document.getElementById('lot')
let legalDescription = document.getElementById('legalDescription')
let propertyOwner = document.getElementById('propertyOwnerphone')

let constructionType = document.getElementById('constructionType')
let scope = document.getElementById('scope')
let projectCost = document.getElementById('cost')
let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')

let permitType = document.getElementById('permitType')
let applicationNumber = document.getElementById('applicationNumber')
let fees = document.getElementById('fee')
let paymentMethod = document.getElementById('paymentMethod')

// Function to execute when user opens summary page to show the total and pending number of permits
if (window.location.pathname === '/summary.html') {
    function getPermitCounts() {
        if (!permitDetails) {
            return;
        }
        let totalPermits = permitDetails.length
        let pendingPermits = permitDetails.filter((permit) => permit.status === 'pending').length

        let totalPermitField = document.getElementById('totalPermits')
        let pendingPermitField = document.getElementById('pendingPermits')

        totalPermitField.innerHTML = `Total permits Issued: ${totalPermits}`
        pendingPermitField.innerHTML = `Pending permits: ${pendingPermits}`
    }
    getPermitCounts();
}

// Function to populate the fields with the information when user opened the detailed view of the permits
function populateFields() {
    for (var i = 0; i < filteredDetails.length; i++) {
        applicantName.value = filteredDetails[i].applicantName
        address.value = filteredDetails[i]?.applicantContactDetails?.address || '-'
        email.value = filteredDetails[i]?.applicantContactDetails?.email || '-'
        phoneNumber.value = filteredDetails[i]?.applicantContactDetails?.phone || '-'
        contractorName.value = filteredDetails[i]?.contractorContactDetails?.name || '-'


        propertyAddress.value = filteredDetails[i]?.propertyInfo?.propertyAddress || '-'
        lot.value = filteredDetails[i]?.propertyInfo?.lot || '-'
        legalDescription.value = filteredDetails[i]?.propertyInfo?.legalDesc || '-'
        propertyOwner.value = filteredDetails[i]?.propertyInfo?.propertyOwner || '-'

        constructionType.value = filteredDetails[i]?.propertyDesc?.type || '-'
        scope.value = filteredDetails[i]?.propertyDesc?.scope || '-'
        projectCost.value = filteredDetails[i]?.propertyDesc?.estimation || '-'
        startDate.value = filteredDetails[i]?.propertyDesc?.projectStartDate || '-'
        endDate.value = filteredDetails[i]?.propertyDesc?.projectEndDate || '-'

        permitType.value = filteredDetails[i]?.permit?.type || '-'
        applicationNumber.value = filteredDetails[i]?.permit?.application || '-'
        fees.value = filteredDetails[i]?.permit?.fees || '-'
        paymentMethod.value = filteredDetails[i]?.permit?.method || '-'
    }
}
populateFields();

// Function to render the complete list of permits in the dashboard in cards along with the redirection capability
function renderData() {
    const container = document.querySelector('.mainContainer');

    if (!permitDetails) {
        return;
    }

    permitDetails.forEach(item => {
        const card = document.createElement('div');
        card.role = 'listitem'
        card.ariaRoleDescription = 'permit entries'
        card.tabIndex = 0
        card.classList.add('card');
        card.classList.add('clickable');
        card.classList.add(`card-${item.id}`);

        card.addEventListener('click', (e) => {
            window.location.href = `/permitDetails.html?permitId=${card.classList[2].split('-')[1]}`
        })

        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = `/permitDetails.html?permitId=${card.classList[2].split('-')[1]}`
            }
        })

        const title = document.createElement('h2');
        title.textContent = `Name: ${item.applicantName}`;

        const phone = document.createElement('p');
        phone.textContent = item?.applicantContactDetails?.phone ? `phone: ${item?.applicantContactDetails?.phone}` : `phone: -`;
        const email = document.createElement('p');
        email.textContent = item?.applicantContactDetails?.email ? `email: ${item?.applicantContactDetails?.email}` : `email: -`;
        const address = document.createElement('p');
        address.textContent = item?.applicantContactDetails?.address ? `address: ${item?.applicantContactDetails?.address}` : `address: -`;
        const contractorDetail = document.createElement('p');
        contractorDetail.textContent = item?.contractorContactDetails?.name ? `contractor: ${item?.contractorContactDetails?.name}` : `contractor: -`;
        const propertyType = document.createElement('p');
        propertyType.textContent = `property type: ${item?.propertyDesc?.type}`;
        const propertyEstimation = document.createElement('p');
        propertyEstimation.textContent = `property estimation: ${item?.propertyDesc?.estimation}`;

        card.appendChild(title);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(address);
        card.appendChild(contractorDetail);
        card.appendChild(propertyType);
        card.appendChild(propertyEstimation);
        container.appendChild(card);
    });
}
renderData();
