(function (mockBackendData) {

    mockBackendData.searchResults = [
        {"id": 41, "firstName": "Douglas", "lastName": "Austin"},
        {"id": 42, "firstName": "Ronald", "lastName": "Bailey"},
        {"id": 43, "firstName": "Jane", "lastName": "Williams"},
        {"id": 44, "firstName": "Evelyn", "lastName": "Washington"},
        {"id": 45, "firstName": "Laura", "lastName": "Garcia"},
        {"id": 46, "firstName": "Gregory", "lastName": "Collins"},
        {"id": 47, "firstName": "Roy", "lastName": "Diaz"},
        {"id": 48, "firstName": "William", "lastName": "Black"},
        {"id": 49, "firstName": "Carol", "lastName": "Murphy"},
        {"id": 50, "firstName": "Roy", "lastName": "Alexander"}
    ];

}(window.mockBackendData || (window.mockBackendData = {})));

(function (mockBackendData) {

    mockBackendData.settings = {
        "reallyCool": true,
        "isAdvanced": false
    };

    mockBackendData.settingsAdvanced = angular.copy(mockBackendData.settings);

    mockBackendData.settingsAdvanced.isAdvanced = true;
    mockBackendData.settingsAdvanced.makeShiny = 0;
    mockBackendData.settingsAdvanced.makeShinyOptions = [
        {
            shiny: 0,
            description: "I don't know, cats?"
        },
        {
            shiny: 1,
            description: "Something about The Alliance"
        },
        {
            shiny: 2,
            description: "Browncoats"
        }
    ];
    
}(window.mockBackendData || (window.mockBackendData = {})));

(function (mockBackendData) {

    mockBackendData.userList = [
        {"id": 1, "firstName": "Todd", "lastName": "Holmes"},
        {"id": 2, "firstName": "Andrea", "lastName": "Reed"},
        {"id": 3, "firstName": "Johnny", "lastName": "Castillo"},
        {"id": 4, "firstName": "Jean", "lastName": "Barnes"},
        {"id": 5, "firstName": "Ryan", "lastName": "Flores"},
        {"id": 6, "firstName": "Jeffrey", "lastName": "Wallace"},
        {"id": 7, "firstName": "Paul", "lastName": "Alexander"},
        {"id": 8, "firstName": "Janice", "lastName": "Carroll"},
        {"id": 9, "firstName": "Clarence", "lastName": "Kim"},
        {"id": 10, "firstName": "Karen", "lastName": "Rogers"},
        {"id": 11, "firstName": "Benjamin", "lastName": "Edwards"},
        {"id": 12, "firstName": "Todd", "lastName": "Garrett"},
        {"id": 13, "firstName": "Kevin", "lastName": "Chavez"},
        {"id": 14, "firstName": "Dennis", "lastName": "Rivera"},
        {"id": 15, "firstName": "Norma", "lastName": "Fernandez"},
        {"id": 16, "firstName": "Joshua", "lastName": "Lewis"},
        {"id": 17, "firstName": "Tammy", "lastName": "Garcia"},
        {"id": 18, "firstName": "Rebecca", "lastName": "Kelly"},
        {"id": 19, "firstName": "Jane", "lastName": "Richardson"},
        {"id": 20, "firstName": "Philip", "lastName": "Weaver"},
        {"id": 21, "firstName": "Kevin", "lastName": "Mills"},
        {"id": 22, "firstName": "Julie", "lastName": "Perry"},
        {"id": 23, "firstName": "Phyllis", "lastName": "Rice"},
        {"id": 24, "firstName": "Andrew", "lastName": "Martinez"},
        {"id": 25, "firstName": "Peter", "lastName": "Richardson"},
        {"id": 26, "firstName": "Arthur", "lastName": "Rodriguez"},
        {"id": 27, "firstName": "Denise", "lastName": "Hart"},
        {"id": 28, "firstName": "Ann", "lastName": "Simmons"},
        {"id": 29, "firstName": "Margaret", "lastName": "Thompson"},
        {"id": 30, "firstName": "Barbara", "lastName": "Jones"},
        {"id": 31, "firstName": "Philip", "lastName": "Gonzalez"},
        {"id": 32, "firstName": "Melissa", "lastName": "Jordan"},
        {"id": 33, "firstName": "Judy", "lastName": "Johnston"},
        {"id": 34, "firstName": "Walter", "lastName": "Lynch"},
        {"id": 35, "firstName": "Martin", "lastName": "Webb"},
        {"id": 36, "firstName": "Robin", "lastName": "Warren"},
        {"id": 37, "firstName": "Benjamin", "lastName": "Gordon"},
        {"id": 38, "firstName": "Susan", "lastName": "Martin"},
        {"id": 39, "firstName": "Emily", "lastName": "Andrews"},
        {"id": 40, "firstName": "Joshua", "lastName": "Rice"},
        {"id": 41, "firstName": "Douglas", "lastName": "Austin"},
        {"id": 42, "firstName": "Ronald", "lastName": "Bailey"},
        {"id": 43, "firstName": "Jane", "lastName": "Williams"},
        {"id": 44, "firstName": "Evelyn", "lastName": "Washington"},
        {"id": 45, "firstName": "Laura", "lastName": "Garcia"},
        {"id": 46, "firstName": "Gregory", "lastName": "Collins"},
        {"id": 47, "firstName": "Roy", "lastName": "Diaz"},
        {"id": 48, "firstName": "William", "lastName": "Black"},
        {"id": 49, "firstName": "Carol", "lastName": "Murphy"},
        {"id": 50, "firstName": "Roy", "lastName": "Alexander"}
    ];

}(window.mockBackendData || (window.mockBackendData = {})));

(function (mockBackendData) {

    mockBackendData.user = {
        "id": 1,
        "gender": "M",
        "firstName": "Henry",
        "lastName": "Stevens",
        "email": "hstevens0@nba.com",
        "street": "4 Westridge Lane",
        "city": "Sidi Yahia el Gharb",
        "country": "Morocco",
        "zip": "83492",
        "canEdit": true
    };

    mockBackendData.userNoEdit = angular.copy(mockBackendData.user);
    mockBackendData.userNoEdit.canEdit = false;

}(window.mockBackendData || (window.mockBackendData = {})));
