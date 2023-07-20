export function createCampaign(title, description, dueDate, author, priority, stat, posts) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        author: author,
        priority: priority,
        status: stat,
        posts: [],
        // get postCount() {
        //     return postCount;
        // },
        };
      }

