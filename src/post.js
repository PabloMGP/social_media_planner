import { allCampaigns } from './campaign';
import { createCampaign } from './createCampaign';
import { createPost } from './createPost';
import { addCampaign } from './campaign';
import { formatDate } from './utilities';
import { loadPostsFromLocalStorage, populatePostDisplay, findCampaignByTitle } from './postUtils';


export const allPosts = [];



export function addPost() {

    const newPostBtn = document.querySelector('.add-post');
    const newPostForm = document.querySelector('.new-post-form');
 
    const campaignDropdown = document.getElementById('campaign-dropdown');
    const closePostsFormBtn = document.querySelector('.close-posts-form')

    const allPostsBtn = document.querySelector('.view-all-posts');
    allPostsBtn.addEventListener('click', () => {
        const postList = document.querySelectorAll('.post-list [data-id]');
        postList.forEach((postElement) => {
            postElement.classList.remove('hidden');

        });
    });

    newPostBtn.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
        console.log('aaa')
    })


    closePostsFormBtn.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    })

    newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const selectedCampaign = campaignDropdown.value;
        const description = document.getElementById('post-description').value;
        const unformattedDueDate = document.getElementById('post-date').value;
        const author = document.getElementById('post-author').value;
        const priority = document.getElementById('post-priority').value;
        const stat = document.getElementById('post-status').value;
        const id = generateUniqueId();

        // Date formating with date-fns
        const dueDate = await formatDate(new Date(unformattedDueDate), 'MMMM dd, yyyy', 'en-US');

        const newPost = createPost(title, selectedCampaign, description, dueDate, author, priority, stat, id);
        allPosts.push(newPost);

        const associatedCampaign = findCampaignByTitle(newPost.selectedCampaign);
        if (associatedCampaign) {
            associatedCampaign.posts.push(newPost);
            console.log(associatedCampaign)
        }

        localStorage.setItem('posts', JSON.stringify(allPosts));

        populatePostDisplay(title, selectedCampaign, description, dueDate, author, priority, stat, id);
    });

    function generateUniqueId() {
        return Date.now().toString();
    }

    
    loadPostsFromLocalStorage();
}

