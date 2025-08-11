const express = require('express');
const { checkIdeaSimilarity } = require('./ideaValidator');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5500',
        'https://mitcapstoneregistration.netlify.app'  // Your actual Netlify URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Initialize Supabase (add these to your .env file)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);
const studentsData = {
"CSE A": [
"Daksh Deepak Sharma",
"Tanmay Pravin Tate",
"Deven Sharad Kshirsagar",
"Aarush Pradeep Kote",
"Sejal Manoj Lokhande",
"Rushil Jain",
"Ayush Ashish Deshmukh",
"Vaishnavi Shailendra Kadam",
"Yuvraj Shailesh Pawar",
"Jay Anand Bhorkar",
"Hoshmit Rajesh Mahajan",
"Vaidehee Susheel Belan",
"Bhakti Dinesh Joshi",
"Atharv Gajanan Chaware",
"Avaneesh Yogesh Kulkarni",
"Samihan Raj Sandbhor",
"Riddhesh Yogesh Patil",
"Rohan Rohit Londhe",
"Sairam Sachin Pardeshi",
"Om Sachin Pardeshi",
"Aryan Madhukar Shinde",
"Ishani Amol Badhe",
"Samruddhi Sandip Bhamodkar",
"Saad Imran Shaikh",
"Shlok Chaitanya Shah",
"Arjun Kedar Jog",
"Purva Swanand Deshmukh",
"Janavi Honrao",
"Ishan Nitin Ranavare",
"Abhiraj Pradeep Borade",
"Sulieman Goluguri",
"Ayush Chandrashekhar Pasalkar",
"Aarushi Pankaj Javali",
"Ishan Bhushan Dhaneshwar",
"Nikhil Raju Jadhav",
"Shaurya Rohit Shewale",
"Telagamreddy Purnasai Saatvik",
"Anish Chaitanya Rashinkar",
"Aditya Singh Chauhan",
"Lalit Vijay Patil",
"Nimish Bhojraj Lanjewar",
"Aditya Anil Patil",
"Bhargav Athreya Munnaluri",
"Samiksha Bipin Pardeshi",
"Om Santosh Desai",
"Aranya Nath Misra",
"Armaan Kumar Rana",
"Glen Leslie Pilmenraj",
"Shwetank Prafulla Patil",
"Nidhi Umakant Thakare",
"Ashkan Altaf Tamboli",
"Deep Dilip Salunkhe",
"Krishnaraj Ravindra Shinde",
"Aayush Abhijeet Patil",
"Shivam Sachin Honrao",
"Saniya Sameer Attar",
"Simran Ramdayal Ray",
"Durva Dilip Deokar",
"Vaidehi Prashant Mane",
"Vedant Sachin Muthiyan",
"Amogh Amit Kelkar",
"Tanishka Ashish Dhanlobhe",
"Yognandan Narayan Behere",
"Avani Pravin Chandsare",
"Krishna Sunil Giridhar",
"Samarth Shivaji Kokate",
"Aarya Aniruddha Deshpande" // From the last line of your sheet fragment
],
"CSE B": [
"Reeya Mandar Keskar",
"Radha Prasad Kurhekar",
"Aarya Dhananjay Deshmukh",
"Khushal Sanjay Diwate",
"Ayush Prashant Patil",
"Apeksha Ishtaling Parashetti",
"Vaishnav Maruti Kaspate",
"Sanchita Suhas Kulkarni",
"Rushikesh Pramod Pawar",
"Aarti Dashrath Raut",
"Neeraj Nandlal Gadiya",
"Reet Jeevan Shewale",
"Vidhi Hasmukh Oswal",
"Ananya Rohidas Gawari",
"Tanisha Jitesh Gandhi",
"Omkar Surendra Purav",
"Aniket Abhay Joshi",
"Vedang Dipesh Desai",
"Priyal Gulab Patil",
"Radhika Sanjay Sogam",
"Khushi Rupareliya",
"Shifa Murad Khan",
"Khushi Manoj Patil",
"Ibrahim Abdul Jalil Khache",
"Nakul Atul Tamboli",
"Sarthak Vitthal Patil",
"Zidan Ghudusab Shaikh",
"Tanmay Navaratan Vyas",
"Siddhi Sunil Takawale",
"Vedant Satish Jaid",
"Abhinav Pramod Raj",
"Vedant Prashant Bhilare",
"Vangmayee Tushar Date",
"Harsh Harihar Kulkarni",
"Shravani Shantanu Mote",
"Ishan Rahul Jabade",
"Anirudha Sachin Thite",
"Ankit Amol Gaware",
"Maithili Mahesh Pene",
"Riya Jay Motwani",
"Palak Pankaj Gadhari",
"Mohammad Rehan Mushaid Ansari",
"Samruddhi Anjish Yadav",
"Swasti Pravin Shinde",
"Vedant Raju Ilag",
"Tanaya Prashant Ganjave",
"Mann Singhvi",
"Durvank Pankaj Borole",
"Vaishnavi Prakash Jadhav",
"Pratham Nanagiri",
"Abhilasha Manoj Gandhi",
"Ishita Sandeep Rajarshi",
"Pratik Bipin Mishra",
"Aditya Prakash Kunjir",
"Pranav Arvindrao Suryawanshi",
"Kushagri Mayur Saxena",
"Unmesh Prakash Giri" // from last line
],
"AIDS": [
"Vedant Prakash Parab",
"Yash Nilesh Gujar",
"Shriya Shirish Sabnis",
"Aaliya Sohail Biswas",
"Sanika Kiran Deshmukh",
"Kshitij Vijay Shinde",
"Ansh Dnyaneshwar Thakare",
"Rutav Ritesh Mehta",
"Tejas Deepak Maskar",
"Shaurya Ajay Panhale",
"Mehran Majid Shaikh",
"Yash Ganesh Gadiwan",
"Sreejit Dhrubajyoti Majumder",
"Aaryan Jitendra Amrute",
"Vivaan Varun Mathur",
"Vedika Rohit Kapoor",
"Soham Sachin Vidhate",
"Shravani Kiran Ruikar",
"Om Vinayak Honrao",
"Darshan Vinayak Nayak",
"Manish Narayan Shinde",
"Vedika Dilip Patil",
"Manthan Moondra",
"Gargi Avinash Yekhande",
"Ritvik Kamble",
"Isha Gajanan Kuchekar",
"Prathamesh Nilesh Tupe",
"Aditya Prashant Bodke",
"Lavya Singh Chauhan",
"Toshika Mukesh Bansal",
"Vaibhavi Satish Patil",
"Saanvi Jeetendra Dhakane",
"Shreyash Shammi Ranjan",
"Aadi Vishal Hanumante",
"Soham Avin Nigam",
"Rishabh Shreyans Patani",
"Pranshu Singh",
"Sarvesh Rakesh Alai",
"Tanish Narendra Bhavsar",
"Aryan Niranjan More",
"Daksh Paul",
"Isha Prashant Kale",
"Harsh Sunil Gidwani",
"Aishi Anurag Srivastava",
"Anushka Nitin Ugale",
"Vansh Parashar",
"Gayatri Pravin Swami",
"Samarth Mahesh Bolkotgi",
"Nakshatra Mukesh Kakani",
"Suneri Amit Jain",
"Yash Kishor Shelke",
"Vrunda Kirtibhai Borisagar",
"Zoya Yunus Sayyad",
"Anaya Sharma",
"Eesha Nema",
"Lokesh Abhijit Gaiki",
"Ojas Rajshekhar Lature",
"Aahan Sachin Ghodke",
"Sujay Heramb Rasal",
"Ajinkya Dattu Sonawane",
"Manmohan Shrinivas Parge",
"Shivtej Dipak Gaikwad",
"Anushka Manoj Wani",
"Vidhi Rohan Rathod",
"Raj Umesh Shinde",
"Tanishka Rajendra Parkale",
"Sakshi Kiran Talegaonkar",
"Shashwath Chandrashekhar Shinde",
"Drishti Rahul Rathod",
"Nicket Urmil Shah",
"Reet Kaur Bhasin",
"Parth Prashant Tupe",
"Aashka Akash Porwal",
"Manyok Samuel Shadrak Chol",
"Rohan Chandrashekhar Kulkarni"
]
};

// Build mentor credentials from environment variables
const mentorCredentials = {};
const mentorNames = [
    'Prof. Mrs. J. G. Mante (Khurpade)', 'Prof. Mrs. S.H. Kulkarni', 'Prof. Mrs. M.P. Fatangare', 'Prof. Mrs. F.I. Shaikh',
    'Prof. Mrs. H.S. Ohal', 'Prof. Mrs. P. S. Patil', 'Prof. Mrs. M. A. Dhotay', 'Prof. Mrs. S.J. Budhavale',
    'Prof. Mrs. S. S. Malwade', 'Prof. Mrs. P.U. Nehete', 'Prof. Mrs. N. G. Dongre', 'Prof. Mrs. M. S. Aware',
    'Prof. Mrs. V. B. Langote', 'Prof. Mr. Y. J. Gaikwad', 'Prof. Mr. V. C. Rathod'
];

for (let i = 1; i <= mentorNames.length; i++) {
    const username = process.env[`MENTOR${i}_USERNAME`];
    const password = process.env[`MENTOR${i}_PASSWORD`];
    if (username && password) {
        mentorCredentials[username] = {
            password: password,
            name: mentorNames[i - 1]
        };
    }
}

// API Endpoints

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Backend is running!',
        timestamp: new Date().toISOString(),
        mentors: Object.keys(mentorCredentials).length
    });
});

// Get all students data
app.get('/api/students', (req, res) => {
    try {
        res.json({ students: studentsData });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Get mentors list
app.get('/api/mentors', (req, res) => {
    try {
        const mentorList = [];
        for (let i = 1; i <=  mentorNames.length; i++) {
            const username = process.env[`MENTOR${i}_USERNAME`];
            if (username && mentorNames[i - 1]) {
                mentorList.push({
                    username: username,
                    name: mentorNames[i - 1]
                });
            }
        }
        res.json({ mentors: mentorList });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
});

// Get all teams
app.get('/api/teams', async (req, res) => {
    try {
        console.log('Fetching teams from Supabase...');

        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }

        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .order('registration_date', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log(`Successfully fetched ${data ? data.length : 0} teams`);
        res.json({ teams: data || [] });
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({
            error: 'Failed to fetch teams',
            details: error.message
        });
    }
});

// ------------- FIXED: Register Team -------------
app.post('/api/teams', async (req, res) => {
    try {
        const teamData = req.body;
        console.log('Saving team:', teamData);

        // Validate required fields...
        if (!teamData.team_id || !teamData.name || !teamData.members) {
            return res.status(400).json({ error: 'Missing required team data: team_id, name, and members are required' });
        }

        // --- AI Duplicate Check
        try {
            const { data: teams, error: fetchErr } = await supabase.from('teams').select('project_ideas');
            if (fetchErr) throw fetchErr;
            const allRegisteredIdeas = (teams || []).flatMap(t => Array.isArray(t.project_ideas) ? t.project_ideas : []);
            const userIdeas = Array.isArray(teamData.project_ideas) ? teamData.project_ideas : [];
            const similarArray = await checkIdeaSimilarity(userIdeas, allRegisteredIdeas);

            if (similarArray.some(Boolean) && !teamData.forceRegisterAnyway) {
                return res.status(200).json({
                    analysis: true,
                    similar: similarArray, // e.g. [true, false, false]
                    message: 'One or more ideas are similar to existing registered ideas. Edit ideas or Register Anyway?'
                });
            }
            // If "Register Anyway", or all ideas are unique, continue to save as usual!
        } catch (error) {
            // If any LLM/database issue, DO NOT stop user, just log and continue!
            console.error('Idea similarity check failed (continuing anyway):', error.message);
        }
        // --- [END AI DUPLICATE LOGIC] ---

        // 🔥 FIX: Remove forceRegisterAnyway before saving to database
        const { forceRegisterAnyway, ...teamDataToSave } = teamData;
        console.log('Saving team to database (without forceRegisterAnyway flag):', teamDataToSave);

        // Save the team in Supabase
        const { data, error } = await supabase
            .from('teams')
            .insert([teamDataToSave])  // ← Use cleaned data without the flag
            .select();

        if (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }
        res.json({ success: true, team: data[0] });

    } catch (error) {
        console.error('Error saving team:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

// Delete team
app.delete('/api/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;

        if (!teamId) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('team_id', teamId);

        if (error) {
            console.error('Supabase delete error:', error);
            throw error;
        }

        res.json({ success: true, message: 'Team deleted successfully' });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({
            error: 'Failed to delete team',
            details: error.message
        });
    }
});

// Update team
app.put('/api/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const updateData = req.body;

        if (!teamId) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        const { data, error } = await supabase
            .from('teams')
            .update(updateData)
            .eq('team_id', teamId)
            .select();

        if (error) {
            console.error('Supabase update error:', error);
            throw error;
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json({ success: true, team: data[0] });
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({
            error: 'Failed to update team',
            details: error.message
        });
    }
});

// Get available students for a department (excluding registered ones)
app.get('/api/students/available/:department', async (req, res) => {
    try {
        const { department } = req.params;
        const { excludeTeamId } = req.query;

        // Validate department
        if (!studentsData[department]) {
            return res.status(400).json({ error: 'Invalid department' });
        }

        // Get all teams
        const { data: teams, error } = await supabase
            .from('teams')
            .select('*');

        if (error) {
            console.error('Error fetching teams for availability check:', error);
            throw error;
        }

        // Get all registered student IDs
        const registeredStudents = new Set();
        (teams || []).forEach(team => {
            // Skip the team being edited if excludeTeamId is provided
            if (excludeTeamId && team.team_id === excludeTeamId) {
                return;
            }
            if (team.members && Array.isArray(team.members)) {
                team.members.forEach(memberId => {
                    registeredStudents.add(memberId);
                });
            }
        });

        // Filter available students
        const departmentStudents = studentsData[department] || [];
        const availableStudents = departmentStudents.filter((student, index) => {
            const studentId = `${department}_${index}`;
            return !registeredStudents.has(studentId);
        });

        res.json({
            students: availableStudents,
            department: department,
            total: departmentStudents.length,
            available: availableStudents.length,
            registered: departmentStudents.length - availableStudents.length
        });
    } catch (error) {
        console.error('Error getting available students:', error);
        res.status(500).json({
            error: 'Failed to get available students',
            details: error.message
        });
    }
});

// Authentication endpoints
app.post('/api/auth/admin', (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Admin login attempt:', username);

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password required' });
        }
        if (username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD) {
            res.json({ success: true, role: 'admin' });
        } else {
            res.json({ success: false, message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.error('Admin auth error:', error);
        res.status(500).json({ success: false, message: 'Authentication error' });
    }
});

app.post('/api/auth/hod', (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('HOD login attempt:', username);

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password required' });
        }

        if (username === process.env.HOD_USERNAME &&
            password === process.env.HOD_PASSWORD) {
            res.json({ success: true, role: 'hod' });
        } else {
            res.json({ success: false, message: 'Invalid HOD credentials' });
        }
    } catch (error) {
        console.error('HOD auth error:', error);
        res.status(500).json({ success: false, message: 'Authentication error' });
    }
});

app.post('/api/auth/mentor', (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Mentor login attempt:', username);

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password required' });
        }

        const mentorData = mentorCredentials[username];
        if (mentorData && mentorData.password === password) {
            res.json({
                success: true,
                role: 'mentor',
                name: mentorData.name,
                username: username
            });
        } else {
            res.json({ success: false, message: 'Invalid mentor credentials' });
        }
    } catch (error) {
        console.error('Mentor auth error:', error);
        res.status(500).json({ success: false, message: 'Authentication error' });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
    try {
        res.json({
            message: 'Backend is running!',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            supabaseConnected: !!supabase,
            mentorsLoaded: Object.keys(mentorCredentials).length
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        res.status(500).json({ error: 'Test failed' });
    }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/') || req.path.startsWith('/test')) {
        return res.status(404).json({ error: 'Endpoint not found' });
    }
    // Serve the frontend
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'), (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).json({
                error: 'Frontend not available',
                message: 'Make sure index.html exists in the frontend directory'
            });
        }
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/test`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Students loaded: CSE A (${studentsData['CSE A'].length}), CSE B (${studentsData['CSE B'].length}), AIDS (${studentsData['AIDS'].length})`);
    console.log(`Mentors loaded: ${Object.keys(mentorCredentials).length}`);
    console.log(`Supabase URL: ${process.env.SUPABASE_URL ? 'Configured' : 'Not configured'}`);
});

