import { createCampaign } from './createCampaign';
import { formatDate } from './utilities';

export const allCampaigns = [];

export function addCampaign() {
const newCampaignBtn = document.querySelector('.add-campaign');
const newCampaignForm = document.querySelector('.new-campaign-form')
const campaignsList = document.querySelector('.campaigns-list');

newCampaignBtn.addEventListener('click', () => {
    newCampaignForm.classList.toggle('hidden');
})

newCampaignForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const unformattedDueDate = document.getElementById('date').value;
    const author = document.getElementById('author').value;
    const priority = document.getElementById('priority').value;
    const stat = document.getElementById('status').value;

    // Date formating with date-fns
    const dueDate = await formatDate(new Date(unformattedDueDate), 'MMMM dd, yyyy', 'en-US');

    const newCampaign = createCampaign(title, description, dueDate, author, priority, stat);
    allCampaigns.push(newCampaign);

    populateDisplay(title, description, dueDate, author, priority, stat);
  });

function populateDisplay(title, description, dueDate, author, priority, stat) {
    const displayCampaign = document.createElement('div');
    const displayTitle = document.createElement('h2');
    const displayDescription = document.createElement('p');
    const displayDueDate = document.createElement('p');
    const displayAuthor = document.createElement('p');
    const displayPriority = document.createElement('p');
    const displayStatus = document.createElement('p');
    const _viewPostsBtn = document.createElement('button');

    displayTitle.textContent = title;
    displayDescription.textContent = `description: ${description}`;
    displayDueDate.textContent = `Due Date: ${dueDate}`;
    displayAuthor.textContent = `Author: ${author}`;
    displayPriority.textContent = `Priority: ${priority}`;
    displayStatus.textContent = `Status: ${stat}`;
    _viewPostsBtn.textContent = 'View Campaign Posts';
    _viewPostsBtn.classList.add('view-posts-btn')

    campaignsList.appendChild(displayCampaign);
    displayCampaign.appendChild(displayTitle);
    displayCampaign.appendChild(displayDescription);
    displayCampaign.appendChild(displayDueDate);
    displayCampaign.appendChild(displayAuthor);
    displayCampaign.appendChild(displayPriority);
    displayCampaign.appendChild(displayStatus);
    displayCampaign.appendChild(_viewPostsBtn);

        // _viewPostsBtn.addEventListener('click', () => {
        //     showAllPosts();
        }
    };
    


// function showAllPosts() {
//     console.log(allCampaigns[0])
