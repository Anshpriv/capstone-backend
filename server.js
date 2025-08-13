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
    "AIDS": [
        ["Vedant Prakash Parab",1354],
        ["Yash Nilesh Gujar", 5305],
        ["Shriya Shirish Sabnis", 2012],
        ["Aaliya Sohail Biswas", 5797],
        ["Sanika Kiran Deshmukh", 2503],
        ["Kshitij Vijay Shinde", 2024],
        ["Ansh Dnyaneshwar Thakare", 2424],
        ["Rutav Ritesh Mehta", 1948],
        ["Tejas Deepak Maskar", 7992],
        ["Shaurya Ajay Panhale", 6601],
        ["Mehran Majid Shaikh", 2015],
        ["Yash Ganesh Gadiwan", 8893],
        ["Sreejit Dhrubajyoti Majumder", 3328],
        ["Aaryan Jitendra Amrute", 4322],
        ["Vivaan Varun Mathur", 8737],
        ["Vedika Rohit Kapoor", 3828],
        ["Soham Sachin Vidhate", 6594],
        ["Shravani Kiran Ruikar", 5567],
        ["Om Vinayak Honrao", 8674],
        ["Darshan Vinayak Nayak", 6524],
        ["Manish Narayan Shinde", 4111],
        ["Vedika Dilip Patil", 8623],
        ["Manthan Moondra", 1833],
        ["Gargi Avinash Yekhande", 1007],
        ["Ritvik Kamble", 3289],
        ["Isha Gajanan Kuchekar", 8236],
        ["Prathamesh Nilesh Tupe", 4053],
        ["Aditya Prashant Bodke", 2006],
        ["Lavya Singh Chauhan", 1411],
        ["Toshika Mukesh Bansal", 7796],
        ["Vaibhavi Satish Patil", 7967],
        ["Saanvi Jeetendra Dhakane", 5490],
        ["Shreyash Shammi Ranjan", 4010],
        ["Aadi Vishal Hanumante", 1219],
        ["Soham Avin Nigam", 7157],
        ["Rishabh Shreyans Patani", 1525],
        ["Pranshu Singh", 6703],
        ["Sarvesh Rakesh Alai", 3142],
        ["Tanish Narendra Bhavsar", 7444],
        ["Aryan Niranjan More", 8766],
        ["Daksh Paul", 1491],
        ["Isha Prashant Kale", 4943],
        ["Harsh Sunil Gidwani", 8540],
        ["Aishi Anurag Srivastava", 9718],
        ["Anushka Nitin Ugale", 5209],
        ["Vansh Parashar", 5852],
        ["Gayatri Pravin Swami", 7201],
        ["Samarth Mahesh Bolkotgi", 7236],
        ["Nakshatra Mukesh Kakani", 1130],
        ["Suneri Amit Jain", 2496],
        ["Yash Kishor Shelke", 1440],
        ["Vrunda Kirtibhai Borisagar", 4140],
        ["Zoya Yunus Sayyad", 8955],
        ["Anaya Sharma", 6440],
        ["Eesha Nema", 3597],
        ["Lokesh Abhijit Gaiki", 9422],
        ["Ojas Rajshekhar Lature", 2470],
        ["Aahan Sachin Ghodke", 7781],
        ["Sujay Heramb Rasal", 1918],
        ["Ajinkya Dattu Sonawane", 4145],
        ["Manmohan Shrinivas Parge", 4107],
        ["Shivtej Dipak Gaikwad", 4231],
        ["Anushka Manoj Wani", 9993],
        ["Vidhi Rohan Rathod", 4526],
        ["Raj Umesh Shinde", 6087],
        ["Tanishka Rajendra Parkale", 4136],
        ["Sakshi Kiran Talegaonkar", 3727],
        ["Shashwath Chandrashekhar Shinde", 5631],
        ["Drishti Rahul Rathod", 7136],
        ["Nicket Urmil Shah", 1421],
        ["Reet Kaur Bhasin", 9154],
        ["Parth Prashant Tupe", 8628],
        ["Aashka Akash Porwal", 4812],
        ["Manyok Samuel Shadrak Chol", 3156],
        ["Rohan Chandrashekhar Kulkarni", 1284],
        ["Vallabh Pawar", 9798]
    ],
    "CSE A": [
        ["Daksh Deepak Sharma", 5235],
        ["Tanmay Pravin Tate", 1463],
        ["Deven Sharad Kshirsagar", 2589],
        ["Aarush Pradeep Kote", 5679],
        ["Sejal Manoj Lokhande", 2082],
        ["Rushil Jain", 7604],
        ["Ayush Ashish Deshmukh", 2430],
        ["Vaishnavi Shailendra Kadam", 9801],
        ["Yuvraj Shailesh Pawar", 3482],
        ["Jay Anand Bhorkar", 3146],
        ["Hoshmit Rajesh Mahajan", 6056],
        ["Vaidehee Susheel Belan", 1011],
        ["Bhakti Dinesh Joshi", 7333],
        ["Atharv Gajanan Chaware", 2192],
        ["Avaneesh Yogesh Kulkarni", 3776],
        ["Samihan Raj Sandbhor", 9601],
        ["Riddhesh Yogesh Patil", 9816],
        ["Rohan Rohit Londhe", 4781],
        ["Sairam Sachin Pardeshi", 4056],
        ["Om Sachin Pardeshi", 8152],
        ["Aryan Madhukar Shinde", 5067],
        ["Ishani Amol Badhe", 7008],
        ["Samruddhi Sandip Bhamodkar", 3181],
        ["Saad Imran Shaikh", 5779],
        ["Shlok Chaitanya Shah", 1942],
        ["Arjun Kedar Jog", 1001],
        ["Purva Swanand Deshmukh", 3808],
        ["Janavi Honrao", 7549],
        ["Ishan Nitin Ranavare", 4330],
        ["Abhiraj Pradeep Borade", 7638],
        ["Sulieman Goluguri", 3025],
        ["Ayush Chandrashekhar Pasalkar", 6055],
        ["Aarushi Pankaj Javali", 7336],
        ["Ishan Bhushan Dhaneshwar", 4196],
        ["Nikhil Raju Jadhav", 3172],
        ["Shaurya Rohit Shewale", 9612],
        ["Telagamreddy Purnasai Saatvik", 2123],
        ["Anish Chaitanya Rashinkar", 4981],
        ["Aditya Singh Chauhan", 3332],
        ["Lalit Vijay Patil", 2404],
        ["Nimish Bhojraj Lanjewar", 4614],
        ["Aditya Anil Patil", 4346],
        ["Bhargav Athreya Munnaluri", 1197],
        ["Samiksha Bipin Pardeshi", 8819],
        ["Om Santosh Desai", 6857],
        ["Aranya Nath Misra", 2285],
        ["Armaan Kumar Rana", 5609],
        ["Glen Leslie Pilmenraj", 3644],
        ["Shwetank Prafulla Patil", 9409],
        ["Nidhi Umakant Thakare", 6771],
        ["Ashkan Altaf Tamboli", 4021],
        ["Deep Dilip Salunkhe", 7689],
        ["Krishnaraj Ravindra Shinde", 6438],
        ["Aayush Abhijeet Patil", 4837],
        ["Shivam Sachin Honrao", 9634],
        ["Saniya Sameer Attar", 2767],
        ["Simran Ramdayal Ray", 1356],
        ["Durva Dilip Deokar", 7750],
        ["Vaidehi Prashant Mane", 1907],
        ["Vedant Sachin Muthiyan", 9632],
        ["Amogh Amit Kelkar", 6674],
        ["Tanishka Ashish Dhanlobhe", 3938],
        ["Yognandan Narayan Behere", 6941],
        ["Avani Pravin Chandsare", 7142],
        ["Krishna Sunil Giridhar", 3007],
        ["Samarth Shivaji Kokate", 4463],
        ["Aarya Aniruddha Deshpande", 5470]
    ],
    "CSE B": [
        ["Reeya Mandar Keskar", 3883],
        ["Radha Prasad Kurhekar", 9067],
        ["Aarya Dhananjay Deshmukh", 8973],
        ["Khushal Sanjay Diwate", 9540],
        ["Ayush Prashant Patil", 3523],
        ["Apeksha Ishtaling Parashetti", 4986],
        ["Vaishnav Maruti Kaspate", 2585],
        ["Sanchita Suhas Kulkarni", 5629],
        ["Rushikesh Pramod Pawar", 8429],
        ["Aarti Dashrath Raut", 5048],
        ["Neeraj Nandlal Gadiya", 5827],
        ["Reet Jeevan Shewale", 7664],
        ["Vidhi Hasmukh Oswal", 2476],
        ["Ananya Rohidas Gawari", 3864],
        ["Tanisha Jitesh Gandhi", 1601],
        ["Omkar Surendra Purav", 8645],
        ["Aniket Abhay Joshi", 6130],
        ["Vedang Dipesh Desai", 5711],
        ["Priyal Gulab Patil", 3564],
        ["Radhika Sanjay Sogam", 5770],
        ["Khushi Rupareliya", 6153],
        ["Shifa Murad Khan", 4493],
        ["Khushi Manoj Patil", 8890],
        ["Ibrahim Abdul Jalil Khache", 7753],
        ["Nakul Atul Tamboli", 5461],
        ["Sarthak Vitthal Patil", 7873],
        ["Zidan Ghudusab Shaikh", 7093],
        ["Tanmay Navaratan Vyas", 3205],
        ["Siddhi Sunil Takawale", 5421],
        ["Vedant Satish Jaid", 1425],
        ["Abhinav Pramod Raj", 8284],
        ["Vedant Prashant Bhilare", 2844],
        ["Vangmayee Tushar Date", 1703],
        ["Harsh Harihar Kulkarni", 3854],
        ["Shravani Shantanu Mote", 7468],
        ["Ishan Rahul Jabade", 1862],
        ["Anirudha Sachin Thite", 5117],
        ["Ankit Amol Gaware", 6977],
        ["Maithili Mahesh Pene", 1439],
        ["Riya Jay Motwani", 2331],
        ["Palak Pankaj Gadhari", 9834],
        ["Mohammad Rehan Mushaid Ansari", 5667],
        ["Samruddhi Anjish Yadav", 2754],
        ["Swasti Pravin Shinde", 6446],
        ["Vedant Raju Ilag", 5553],
        ["Tanaya Prashant Ganjave", 1446],
        ["Mann Singhvi", 5344],
        ["Durvank Pankaj Borole", 6821],
        ["Vaishnavi Prakash Jadhav", 7463],
        ["Pratham Nanagiri", 9833],
        ["Abhilasha Manoj Gandhi", 2304],
        ["Ishita Sandeep Rajarshi", 8770],
        ["Pratik Bipin Mishra", 6264],
        ["Aditya Prakash Kunjir", 4912],
        ["Pranav Arvindrao Suryawanshi", 1004],
        ["Kushagri Mayur Saxena", 3063],
        ["Unmesh Prakash Giri", 9837]
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

app.post('/api/auth/student', (req, res) => {
    try {
        const { studentName, accessCode, department } = req.body;
        
        // 🔥 ENHANCED DEBUG LOGGING - Add this temporarily
        console.log('=== DETAILED AUTH DEBUG ===');
        console.log('Raw request body:', JSON.stringify(req.body));
        console.log('Student name received:', `"${studentName}"`);
        console.log('Student name type:', typeof studentName);
        console.log('Student name length:', studentName ? studentName.length : 'null');
        console.log('Access code received:', accessCode);
        console.log('Access code type:', typeof accessCode);
        console.log('Department:', department);
        console.log('===============================');
        
        if (!studentName || !accessCode || !department) {
            return res.status(400).json({ 
                success: false, 
                message: 'Student name, access code, and department are required' 
            });
        }

        const departmentStudents = studentsData[department];
        if (!departmentStudents) {
            console.log('❌ Invalid department:', department);
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid department selected' 
            });
        }

        let studentFound = false;
        let studentIndex = -1;
        
        // 🔥 ENHANCED MATCHING WITH DETAILED LOGS
        console.log('--- MATCHING PROCESS ---');
        for (let i = 0; i < departmentStudents.length; i++) {
            const [name, code] = departmentStudents[i];
            
            // Log each comparison
            const nameMatch = name.toLowerCase().trim() === studentName.toLowerCase().trim();
            const codeMatch = code === parseInt(accessCode);
            
            console.log(`Checking [${i}]: "${name}" vs "${studentName}" | ${code} vs ${parseInt(accessCode)}`);
            console.log(`  - Name match: ${nameMatch} | Code match: ${codeMatch}`);
            
            if (nameMatch && codeMatch) {
                studentFound = true;
                studentIndex = i;
                console.log('✅ PERFECT MATCH FOUND!');
                break;
            }
        }
        console.log('--- END MATCHING ---');

        if (studentFound) {
            console.log(`✅ Student verified: ${studentName} from ${department}`);
            res.json({ 
                success: true, 
                message: 'Student verification successful',
                student: {
                    name: studentName,
                    department: department,
                    index: studentIndex,
                    id: `${department}_${studentIndex}`
                }
            });
        } else {
            console.log(`❌ Verification failed: ${studentName} from ${department}`);
            res.json({ 
                success: false, 
                message: 'Invalid student name or access code. Please check your credentials carefully.' 
            });
        }

    } catch (error) {
        console.error('Student authentication error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Authentication server error' 
        });
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
    console.log(`Students loaded with access codes: AIDS (${studentsData['AIDS'].length}), CSE A (${studentsData['CSE A'].length}), CSE B (${studentsData['CSE B'].length})`);
console.log('Student authentication system: ENABLED');

    console.log(`Mentors loaded: ${Object.keys(mentorCredentials).length}`);
    console.log(`Supabase URL: ${process.env.SUPABASE_URL ? 'Configured' : 'Not configured'}`);
});

