

export const flowChartData = `
flowchart LR
    subgraph "Database (Supabase)"
    db(PostgreSQL)	
    end
    subgraph "Backend (Azure)"
    bk(Express.js)
    end
    subgraph "Frontend (Netlify)"
        fr(React)	
    end
	fr-->bk
	bk-->db
	db-->bk
	bk-->fr
`