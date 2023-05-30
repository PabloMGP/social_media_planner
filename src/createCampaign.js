export function createCampaign(title, description, postCount, dueDate, author, priority, stat) {
    return {
        title: title,
        description: description,
        postCount: postCount,
        dueDate: dueDate,
        author: author,
        priority: priority,
        status: stat,
    };
} 