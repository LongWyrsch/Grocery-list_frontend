export default `
gantt
                title Grocery list
                dateFormat YYYY-MM-DD
                axisFormat %m-%d
                tickInterval 1day
            
                %% [Git] --> git commit --> red
                %% ** --> notes in Obsidian --> bold

                section UI/UX design
                    wireframe: done, wireframe, 2022-12-07, 1d
                    prototype: done, prototype, after wireframe, 2d
                    color: done, color, after prototype, 12h
                    logo: done, logo, after color, 1d

                section Back end
                    Schema relationship diagram: done, ard, 2022-12-17, 1d
                    Review Express session and Passport: done, resap, after ard, 3d
                    Set up SQL database: done, susd, after resap, 1d
                    [Git] Initialize Express project **: done, irp, after susd, 4h
                    Test Supabase API: done, tsa, after irp, 12h
                    [Git] Set up Google auth: done, suga, after tsa, 36h
                    [Git] Set up local auth: done, sula, 2022-12-25, 2d
                    [Git] Write OpenAPI: done, wo, after sula, 3d
                    Add endpoint PUT /users: done, aepu, after wo, 1d
                    Add endpoint DELETE /users: done, aedu, after wo, 1d
                    Add endpoint PUT /avatars: done, aepa, after wo, 1d
                    [Git] Add endpoints PUT/users DELETE/users PUT/avatars: done, milestone, gaeua, after aepa, 0d
                    Create Supabase functions: done, csfrdv, after aepa, 1d
                    Add endpoint GET /recipes: done, aegr, after aepa, 1d
                    Add endpoint POST /recipes: done, aepor, after aepa, 1d
                    Add endpoint PUT /recipes: done, aepur, after aepa, 1d
                    Add endpoint DELETE /recipes: done, aedr, after aepa, 1d
                    [Git] Add endpoints /recipes: done, milestone, gaer, after aedr, 0d
                    Add endpoint GET /lists: done, aegl, after aedr, 12h
                    Add endpoint POST /lists: done, aepol, after aedr, 12h
                    Add endpoint PUT /lists: done, aepul, after aedr, 12h
                    Add endpoint DELETE /lists: done, aedl, after aedr, 12h
                    [Git] Add endpoints /lists: done, milestone, gael, after aedl, 0d
                    [Git] Add data validation: done, adva, after addlg, 2h
                    [Git] Add organizeIngredients.js: done, aorgi, after acam, 12h
                    [Git] Update user schema, debug signin and signup routes: done, uusdssr, after aorgi, 12h

                section Front end 
                    Review React: done, rr, after logo, 7d
                    [Git] Initialize React project **: done, irp, after rr, 1d
                    Learn drag/drop in React: done, ldndr, after aedl, 12h
                    Learn lightdark mode in React: done, lldmr, after aedl, 12h
                    Learn language-picker in React: done, llpr, after aedl, 12h
                    Add column 'modified date' to lists: done, acldl, after aedl, 12h
                    Test food/kCal API **: done, tfk, after aedl, 12h
                    [Git] Add ligth dark mode: done, aldm, after tfk, 12h
                    [Git] Add language picker **: done, alanp, after aldm, 12h
                    [Git] Add normalize.css and font: done, anaf, after alanp, 2h 
                    [Git] Add design system CSS, textfield and button component: done, adstb, after alanp, 2d
                    Add login page: done, addlg, after alanp, 2d
                    Add user credentials validation: done, aucv, after addlg, 12h
                    [Git] Add login page and user credentials validation: done, milestone, alpuc, after aucv, 0d
                    [Git] Add registration page: done, addrp, after alpuc, 12h
                    [Git] Add language dropdown component: done, aldc, after alpuc, 1d
                    [Git] Add navbar: done, anav, after aldc, 12h
                    [Git] Add user state: done, aust, after anav, 12h
                    [Git] Add corner avatar menu: done, acam, after aust, 12h
                    [Git] Debug signin and signup routes: done, dsasr, after acam, 1d
                    [Git] Add Grid component and recipesSlice**: done, agcar, after dsasr, 2d
                    [Git] Add MiniCard component: done, aminic, after agcar, 12h
                    Learn react-beautiful-dnd: done, lrdnd, after aminic, 12h
                    [Git] Add RecipeCard component: done, arcc, after lrdnd, 1d
                    [Git] Add update and delete function to RecipeCard: done, audftr, after arcc, 1d
                    [Git] Add react-beautiful-dnd to RecipeCard: done, arbdnd, after audftr, 12h
                    Add queueTask to buffer server requests: done, aqtbsr, after arbdnd, 1d
                    Save user grid layout: done, sugl, after aqtbsr, 1d
                    Add row delete function: done, ardf, 2023-01-16, 12h
                    [Git] Save user grid layout and add row delete function: milestone, done, auglardf, after ardf, 0d
                    [Git] Make card title editabe and save card modification time: done, matescm, after ardf, 12h
                    [Git] Add create card function: done, acftr, after ardf, 12h
                    [Git] Debug user grid layouts saving by handling JSON parsing serverside and provide default layouts with generateLayouts: done, jpsdl, after ardf, 1d
                    [Git] Extend CRUD features to lists: done, eftl, after jpsdl, 36h
                    [Git] Add user settings page: done, ausp, after eftl, 36h
                    [Git] Expand translation to all pages: done, attap, after ausp, 12h
                    [Git] Add kCal from nutrition API: done, fkapi, after ausp, 12h
                    [Git] New card local date format: done, ncldf, after fkapi, 2h
                    Plan homepage: done, plhp, after ncldf, 12h
                    [Git] Add demo account: done, ademoa, after plhp, 12h
                    [Git] Add quickTour feature: done, aqtour, after ademoa, 12h
                    %% ~ ~ ~ ~ ~ ~ ==> H E R E <== ~ ~ ~ ~ ~ ~ ~ 
                    [Git] Design homepage sections and buttons: dhomep, after aqtour, 12h
                    [Git] Add morphing separation to homepage: amorsh, after dhomep, 12h
                    [Git] Add animated arrow to homepage: asniah, after amorsh, 12h
                    [Gti] Translate homepage: trhop, after asniah, 12h
                    [Git] Add behind the scenes: abtsc, after asniah, 12h
                    [Git] Add loading indicator: aloadi, after abtsc, 12h
                    [Git] Add password recovery function: aprf, after aloadi, 12h
                    [Git] Improve accessibility: acce, after aprf, 1d
                    %% Update schema diagram pdf
                section Deploy
                    Deploy on Netlify: dpn, after acce, 12h
                    Update to HTTPS: uhttps, after dpn, 1d
                    Update all URLs: uaurl, after uhttps, 12h
                    Update URLs in openAPI: urlsapi, after uaurl, 12h

`