export function createPost(title, selectedCampaign, description, dueDate, author, priority, stat, id) {
    return {
        title: title,
        selectedCampaign: selectedCampaign,
        description: description,
        dueDate: dueDate,
        author: author,
        priority: priority,
        status: stat,
        id: id,
    };
} 

