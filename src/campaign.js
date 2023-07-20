import { createCampaign } from './createCampaign';
import { formatDate } from './utilities';
import { addPost, allPosts } from './post';
import { formatDistanceWithOptions } from 'date-fns/fp';
import { loadPostsFromLocalStorage, populatePostDisplay, deleteAll } from './postUtils';

export const allCampaigns = [];



// Create Campaign
export function addCampaign() {
    function loadCampaignsFromLocalStorage() {
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns'));
        if (savedCampaigns && Array.isArray(savedCampaigns)) {
            allCampaigns.push(...savedCampaigns);
            savedCampaigns.forEach((campaign, index) => {
                populateDisplay(campaign.title, campaign.description, campaign.dueDate, campaign.author, campaign.priority, campaign.stat, index);
            });
        }
    }

    const newCampaignBtn = document.querySelector('.add-campaign');
    const newCampaignForm = document.querySelector('.new-campaign-form')
    const campaignsList = document.querySelector('.campaigns-list');
    const closeCampaignsForm = document.querySelector('.close-campaigns-form');

    newCampaignBtn.addEventListener('click', () => {
        newCampaignForm.classList.toggle('hidden');
    })

    closeCampaignsForm.addEventListener('click', () => {
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

        localStorage.setItem('campaigns', JSON.stringify(allCampaigns));
        console.log(localStorage)
        populateDisplay(title, description, dueDate, author, priority, stat, allCampaigns.length - 1);
    });

    // Populate Campaign Object Function
    function populateDisplay(title, description, dueDate, author, priority, stat, index) {
        const campaignDropdown = document.getElementById('campaign-dropdown');
        campaignDropdown.textContent = '';

        allCampaigns.forEach((campaign) => {
            const option = document.createElement('option');
            option.value = campaign.title;
            option.textContent = campaign.title;
            campaignDropdown.appendChild(option);
        });


        const displayCampaign = document.createElement('div');
        const displayTitle = document.createElement('h2');
        const displayDescription = document.createElement('p');
        const displayDueDate = document.createElement('p');
        const displayAuthor = document.createElement('p');
        const displayPriority = document.createElement('p');
        const displayStatus = document.createElement('p');
        const _deleteCampaignBtn = document.createElement('button');
        const _viewPostsBtn = document.createElement('button');
        _viewPostsBtn.dataset.campaignId = index;

        displayTitle.textContent = title;
        displayDescription.textContent = `description: ${description}`;
        displayDueDate.textContent = `Due Date: ${dueDate}`;
        displayAuthor.textContent = `Author: ${author}`;
        displayPriority.textContent = `Priority: ${priority}`;
        displayStatus.textContent = `Status: ${stat}`;
        _viewPostsBtn.textContent = 'View Campaign Posts';
        _viewPostsBtn.classList.add('view-posts-btn', 'view-button');
        _deleteCampaignBtn.textContent = 'Delete Campaign';
        _deleteCampaignBtn.classList.add('close-button');

        campaignsList.appendChild(displayCampaign);
        displayCampaign.appendChild(displayTitle);
        displayCampaign.appendChild(displayDescription);
        displayCampaign.appendChild(displayDueDate);
        displayCampaign.appendChild(displayAuthor);
        displayCampaign.appendChild(displayPriority);
        displayCampaign.appendChild(displayStatus);

        displayCampaign.appendChild(_deleteCampaignBtn);
        _deleteCampaignBtn.addEventListener('click', () => {
            deleteCampaign(index);
            campaignsList.removeChild(displayCampaign);
        })

        displayCampaign.appendChild(_viewPostsBtn);
        _viewPostsBtn.addEventListener('click', (event) => {
            const campaignId = event.target.dataset.campaignId;
            showCampaignPosts(campaignId);

        });
        return displayCampaign;
    }





    function showCampaignPosts(campaignId) {
        const postList = document.querySelectorAll('.post-list');

        resetPostStyles();

        if (campaignId === 'all') {
            // Show all posts - Pending Button
            postList.forEach((postElement) => {
                postElement.classList.remove('hidden');
                postElement.classList.remove('highlighted'); // Remove red background
            });
        } else {
            const campaign = allCampaigns[campaignId];
            const campaignPosts = allPosts.filter((post) => post.selectedCampaign === campaign.title);
            console.log(campaignPosts);
            console.log('Showing all campaign posts now');

            // Toggle relevant campaign posts
            applyPostStyles(campaignPosts);
        }
    };

    loadCampaignsFromLocalStorage();
}

function resetPostStyles() {
    const postList = document.querySelectorAll('.post-list [data-id]');
    postList.forEach((postElement) => {
        postElement.classList.remove('highlighted');
        postElement.classList.add('hidden');
    });
}

function applyPostStyles(posts) {
    posts.forEach((post) => {
        const postElement = document.querySelector(`[data-id="${post.id}"]`);
        if (postElement) {
            postElement.classList.remove('hidden');
        }
    });
}


function deleteCampaign(index) {
    const campaignToDelete = allCampaigns[index];
    if (!campaignToDelete) {
        console.error(`Campaign at index ${index} does not exist.`);
        return;
    }

    // Find and remove associated posts from the allPosts array
    const associatedPosts = allPosts.filter((post) => post.selectedCampaign === campaignToDelete.title);
    const postList = document.querySelector('.post-list');
    let hasAssociatedPosts = false; // Flag to track if the campaign has associated posts

    for (let i = associatedPosts.length - 1; i >= 0; i--) {
        const post = associatedPosts[i];
        const postIndex = allPosts.indexOf(post);
        if (postIndex !== -1) {
            allPosts.splice(postIndex, 1);
            const postNode = postList.querySelector(`[data-id="${post.id}"]`);
            if (postNode) {
                postList.removeChild(postNode);
            }
            hasAssociatedPosts = true; // Set the flag to true if there are associated posts
        }
    }

    // Remove the campaign from the allCampaigns array
    allCampaigns.splice(index, 1);

    // Update localStorage after removing a campaign and its associated posts
    localStorage.setItem('campaigns', JSON.stringify(allCampaigns));
    localStorage.setItem('posts', JSON.stringify(allPosts));

    // Load posts from localStorage only if there are remaining posts after deleting the campaign
    if (hasAssociatedPosts) {
        loadPostsFromLocalStorage();
    }
}










        // function applyCampaignStyle(campaign) {
        //     // Assuming campaigns are wrapped in a container with class "campaign-list"
        //     const campaignList = document.querySelector('.campaigns-list');
        //     const campaignElement = campaignList.querySelector(`[data-campaign-id="${campaign.id}"]`);
        //     if (campaignElement) {
        //         campaignElement.classList.add('highlighted');
        //     }
        // }

        // function deleteCampaign(index) {
        //     allCampaigns.splice(index, 1);
        //     // Update localStorage after removing a campaign
        //     localStorage.setItem('campaigns', JSON.stringify(allCampaigns));