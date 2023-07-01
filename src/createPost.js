export function createPost(title, campaign, description, postCount, dueDate, author, priority, stat) {
    return {
        title: title,
        campaign: campaign,
        description: description,
        postCount: postCount,
        dueDate: dueDate,
        author: author,
        priority: priority,
        status: stat,
    };
} 