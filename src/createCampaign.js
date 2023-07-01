export function createCampaign(title, description, dueDate, author, priority, stat, posts, postCount = 0) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        author: author,
        priority: priority,
        status: stat,
        posts: [],
        get postCount() {
            return postCount;
        },
        set postCount(value) {
            postCount = value;
        },
    };
} 

