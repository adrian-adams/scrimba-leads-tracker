import { onValue } from "firebase/database";

export function RenderLeads(ListData, HTMLContainerEL, BTListStyle = true, LogData = false) {
    if (BTListStyle) {
       HTMLContainerEL.classList.add("list-group"); 
    }

    onValue(ListData, function(snapshot) {
        HTMLContainerEL.textContent = "";
        const snapshotDoesExist = snapshot.exists();

        if(snapshotDoesExist) {
            const snapshotVal = snapshot.val();
            const leads = Object.values(snapshotVal);

            leads.forEach(i => {
                const childKey = i;
                const childData = i;

                const li = document.createElement("li");
                const a = document.createElement("a");

                li.classList.add("list-group-item");
                a.textContent = childData;
                a.href = childData;
                a.target = "_blank";
                a.classList.add("list-item-link");

                li.appendChild(a);
                HTMLContainerEL.appendChild(li);
            });
        }
        
        console.log("Render List snapshot", snapshot.val());
    })

    if (LogData) {
        console.log("Full List:", ListData);
    };
} 