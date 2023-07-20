import { allPosts } from "./post";
import { allCampaigns } from "./campaign";

export function loadPostsFromLocalStorage() {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts && Array.isArray(savedPosts)) {
        allPosts.push(...savedPosts);
        savedPosts.forEach((post, index) => {
            populatePostDisplay(post.title, post.description, post.dueDate, post.author, post.priority, post.stat, index);
        });
    }
}

export function populatePostDisplay(title, selectedCampaign, description, dueDate, author, priority, stat, id) {
    const postList = document.querySelector('.post-list');
    const displayPost = document.createElement('div');
    const displayTitle = document.createElement('h2');
    const displayCampaign = document.createElement('p');
    const displayDescription = document.createElement('p');
    const displayDueDate = document.createElement('p');
    const displayAuthor = document.createElement('p');
    const displayPriority = document.createElement('p');
    const displayStatus = document.createElement('p');
    const deletePostBtn = document.createElement('button');

    displayPost.dataset.id = id;
    displayTitle.textContent = title;
    displayCampaign.textContent = `Campaign: ${selectedCampaign}`;
    displayDescription.textContent = `description: ${description}`;
    displayDueDate.textContent = `Due Date: ${dueDate}`;
    displayAuthor.textContent = `Author: ${author}`;
    displayPriority.textContent = `Priority: ${priority}`;
    displayStatus.textContent = `Status: ${stat}`;
    deletePostBtn.textContent = 'Delete Post';
    deletePostBtn.classList.add('close-button')

    postList.appendChild(displayPost);
    displayPost.appendChild(displayTitle);
    displayPost.appendChild(displayCampaign);
    displayPost.appendChild(displayDescription);
    displayPost.appendChild(displayDueDate);
    displayPost.appendChild(displayAuthor);
    displayPost.appendChild(displayPriority);
    displayPost.appendChild(displayStatus);
    displayPost.appendChild(deletePostBtn);

    deletePostBtn.addEventListener('click', () => {
        deletePost(id);
        postList.removeChild(displayPost);
    })
};

function deletePost(id) {
    allPosts.splice(id, 1);
    // Update Local Storage
    localStorage.setItem('posts', JSON.stringify(allPosts));
}

export function findCampaignByTitle(title) {
    return allCampaigns.find((campaign) => campaign.title === title);
}

