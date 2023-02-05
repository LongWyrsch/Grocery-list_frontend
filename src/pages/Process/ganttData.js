export const ganttData = `
gantt
title Grocery list
dateFormat YYYY-MM-DD
axisFormat %d
tickInterval 1day

section UI/UX design
    wireframe: done, wireframe, 2022-12-07, 1d
    prototype: done, prototype, after wireframe, 2d
    color: done, color, after prototype, 12h
    logo: done, logo, after color, 1d

section Back end
    Schema relationship diagram: done, ard, 2022-12-17, 1d
    Review Express session and Passport: done, resap, after ard, 3d
    Set up SQL database: done, susd, after resap, 1d
    Initialize Express project **: done, irp, after susd, 4h
    Test Supabase API: done, tsa, after irp, 12h
    Set up Google auth: done, suga, after tsa, 36h
    Set up local auth: done, sula, 2022-12-25, 2d
    Write OpenAPI: done, wo, after sula, 3d
    Add endpoint PUT /users: done, aepu, after wo, 1d
    Add endpoint DELETE /users: done, aedu, after wo, 1d
    Add endpoint PUT /avatars: done, aepa, after wo, 1d
    Add endpoints PUT/users DELETE/users PUT/avatars: done, milestone, gaeua, after aepa, 0d
    Create Supabase functions: done, csfrdv, after aepa, 1d
    Add endpoint GET /recipes: done, aegr, after aepa, 1d
    Add endpoint POST /recipes: done, aepor, after aepa, 1d
    Add endpoint PUT /recipes: done, aepur, after aepa, 1d
    Add endpoint DELETE /recipes: done, aedr, after aepa, 1d
    Add endpoints /recipes: done, milestone, gaer, after aedr, 0d
    Add endpoint GET /lists: done, aegl, after aedr, 12h
    Add endpoint POST /lists: done, aepol, after aedr, 12h
    Add endpoint PUT /lists: done, aepul, after aedr, 12h
    Add endpoint DELETE /lists: done, aedl, after aedr, 12h
    Add endpoints /lists: done, milestone, gael, after aedl, 0d
    Add data validation: done, adva, after addlg, 2h
    Add organizeIngredients.js: done, aorgi, after acam, 12h
    Update user schema, debug signin and signup routes: done, uusdssr, after aorgi, 12h
    Update openapi.yaml: done, urlsapi, after upproin, 12h
    Secure app: done, seapba, after iipp,36h
    Write tests backend: done, wrtebr, after wrtefr, 1d
    %% ~ ~ ~ ~ ~ ~ ==> H E R E <== ~ ~ ~ ~ ~ ~ ~ 

section Front end 
    Review React: done, rr, after logo, 7d
    Initialize React project **: done, irp, after rr, 1d
    Learn drag/drop in React: done, ldndr, after aedl, 12h
    Learn lightdark mode in React: done, lldmr, after aedl, 12h
    Learn language-picker in React: done, llpr, after aedl, 12h
    Add column 'modified date' to lists: done, acldl, after aedl, 12h
    Test food/kCal API **: done, tfk, after aedl, 12h
    Add ligth dark mode: done, aldm, after tfk, 12h
    Add language picker **: done, alanp, after aldm, 12h
    Add normalize.css and font: done, anaf, after alanp, 2h 
    Add design system CSS, textfield and button component: done, adstb, after alanp, 2d
    Add login page: done, addlg, after alanp, 2d
    Add user credentials validation: done, aucv, after addlg, 12h
    Add login page and user credentials validation: done, milestone, alpuc, after aucv, 0d
    Add registration page: done, addrp, after alpuc, 12h
    Add language dropdown component: done, aldc, after alpuc, 1d
    Add navbar: done, anav, after aldc, 12h
    Add user state: done, aust, after anav, 12h
    Add corner avatar menu: done, acam, after aust, 12h
    Debug signin and signup routes: done, dsasr, after acam, 1d
    Add Grid component and recipesSlice**: done, agcar, after dsasr, 2d
    Add MiniCard component: done, aminic, after agcar, 12h
    Learn react-beautiful-dnd: done, lrdnd, after aminic, 12h
    Add RecipeCard component: done, arcc, after lrdnd, 1d
    Add update and delete function to RecipeCard: done, audftr, after arcc, 1d
    Add react-beautiful-dnd to RecipeCard: done, arbdnd, after audftr, 12h
    Add queueTask to buffer server requests: done, aqtbsr, after arbdnd, 1d
    Save user grid layout: done, sugl, after aqtbsr, 1d
    Add row delete function: done, ardf, 2023-01-16, 12h
    Save user grid layout and add row delete function: milestone, done, auglardf, after ardf, 0d
    Make card title editabe and save card modification time: done, matescm, after ardf, 12h
    Add create card function: done, acftr, after ardf, 12h
    Debug user grid layouts saving by handling JSON parsing serverside and provide default layouts with generateLayouts: done, jpsdl, after ardf, 1d
    Extend CRUD features to lists: done, eftl, after jpsdl, 36h
    Add user settings page: done, ausp, after eftl, 36h
    Expand translation to all pages: done, attap, after ausp, 12h
    Add kCal from nutrition API: done, fkapi, after ausp, 12h
    New card local date format: done, ncldf, after fkapi, 2h
    Plan homepage: done, plhp, after fkapi, 12h
    Add demo account: done, ademoa, after plhp, 12h
    Add quickTour feature: done, aqtour, after ademoa, 12h
    Design homepage sections and buttons: done, dhomep, after aqtour, 12h
    Add morphing separation to homepage: done, amorsh, after dhomep, 12h
    Add scroll animation to homepage: done, scrolla, after dhomep, 12h
    Translate homepage: done, trhop, after scrolla, 12h
    Add Process page: done, propage, after trhop, 12h
    Add homepage and process page: milestone, done, hopropa, after propage, 0d
    Add animated down arrow to homepage: done, asniah, after hopropa, 3h
    Adjust colors: done, adjco, after hopropa, 12h
    Make design responsive: done, mwere, after adjco, 36h
    Update Process page info: done, upproin, after uaurl, 12h
    Improve Introduction on Process page: done, iipp, after urlsapi, 12h
    Translate Homepage cards: done, trhoca, after iipp, 1h 
    Secure app: done, seapfr, after iipp, 36h
    Update Process page with security section: done, uppss, after seapfr, 12h
    Write tests frontend: done, wrtefr, after uppss, 4d
    Update Process page to include Testing section: done, uppit, after wrtebr, 12h

section Deploy
    Deploy on Netlify and Railway: done, dpn, after mwere, 12h
    Update all URLs: done, uaurl, after mwere, 12h
`