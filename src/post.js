import { createPost } from './createPost';
import { formatDate } from './utilities';

export const allPosts = [];

export function addPost() {
const newPostBtn = document.querySelector('.add-post');
const newPostForm = document.querySelector('.new-post-form');
const postList = document.querySelector('.post-list');

newPostBtn.addEventListener('click', () => {
    newPostForm.classList.toggle('hidden');
    console.log('aaa')
})

newPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const unformattedDueDate = document.getElementById('post-date').value;
    const author = document.getElementById('post-author').value;
    const priority = document.getElementById('post-priority').value;
    const stat = document.getElementById('post-status').value;

    // Date formating with date-fns
    const dueDate = await formatDate(new Date(unformattedDueDate), 'MMMM dd, yyyy', 'en-US');

    const newPost = createPost(title, description, dueDate, author, priority, stat);
    allPosts.push(newPost);

    populateDisplay(title);
  });

function populateDisplay(title, description, dueDate, author, priority, stat) {
    const displayPost = document.createElement('div');
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

    postList.appendChild(displayPost);
    displayPost.appendChild(displayTitle);
    displayPost.appendChild(displayDescription);
    displayPost.appendChild(displayDueDate);
    displayPost.appendChild(displayAuthor);
    displayPost.appendChild(displayPriority);
    displayPost.appendChild(displayStatus);
    displayPost.appendChild(_viewPostsBtn);

        _viewPostsBtn.addEventListener('click', () => {
            showAllPosts();
        })
    };
    
}

function showAllPosts() {
    console.log(allCampaigns[0])
}