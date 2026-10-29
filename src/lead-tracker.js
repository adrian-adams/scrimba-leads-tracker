import { RenderLeads } from "./functions";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, remove, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSESGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

console.log("Console Check:", referenceInDB);

const EL_InputPasteUrl = document.getElementById("el-input-addURL")
const EL_BtnAddURL = document.getElementById("el-btn-addURL")
const EL_BtnAddTAB = document.getElementById("el-btn-addTAB")
const EL_BtnClearLeads = document.getElementById("el-btn-clearLeads")
const EL_UlLeadList = document.getElementById("el-ul-URLList")

const renderLeadsVar = () => RenderLeads(referenceInDB, EL_UlLeadList);

// Render Leads if there are existing Leads

if (referenceInDB) {
    renderLeadsVar();
}

// Add Leads via input (ADD URL)
EL_BtnAddURL.addEventListener("click", function() {
    const newLead = EL_InputPasteUrl.value.trim();

    if (!newLead) {
        return 
    }

    try {
        push(referenceInDB, newLead);

        console.log("Success! Data successfully written to Firebase.");
        EL_InputPasteUrl.value = ""; 
        renderLeadsVar();

    } catch (error) {
        console.error("Firebase error details:", error);
    }
});

// Clear All Leads
EL_BtnClearLeads.addEventListener("dblclick", function() {
    remove(referenceInDB); 
    renderLeadsVar();
})