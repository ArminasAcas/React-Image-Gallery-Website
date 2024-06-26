export const userSearchData = {
    setSearchData: (title:string, tags:string, user:string, startDate?:Date, endDate?:Date) => {
        localStorage.setItem("title", title);
        localStorage.setItem("tags", tags);
        if (!startDate) localStorage.removeItem("startDate");
        if (startDate) localStorage.setItem("startDate", JSON.stringify(startDate));
        if (!endDate) localStorage.removeItem("endDate");
        if (endDate) localStorage.setItem("endDate", JSON.stringify(endDate));
        localStorage.setItem("user", user);
    },

    getSearchData: () => {
        const title = localStorage.getItem("title");
        const tags = localStorage.getItem("tags");
        const startDate = JSON.parse(localStorage.getItem("startDate")!);
        const endDate = JSON.parse(localStorage.getItem("endDate")!);
        const user = localStorage.getItem("user");
        return { title, tags, startDate, endDate, user };
    },
    
    removeSearchData: () => {
        localStorage.removeItem("title");
        localStorage.removeItem("tags");
        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");
        localStorage.removeItem("user");
    },

    isSearchDataEmpty: () => {
        let anwser = true;
        let searchData = userSearchData.getSearchData();
        if (searchData.title || searchData.user || searchData.tags || searchData.startDate || searchData.endDate) anwser = false;
        return anwser;
    }
}
