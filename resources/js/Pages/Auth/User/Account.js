import PersonalCard from "./Account/PersonalCard";
import Authenticated from "@/Layouts/Authenticated";
import DeleteAccountCard from "./Account/DeleteAccountCard";
import UpdatePasswordCard from "./Account/UpdatePasswordCard";
import BrowserSessionsCard from "./Account/BrowserSessionsCard";
import TwoFactorSecurityCard from "./Account/TwoFactorSecurityCard";

export default function Profile(props) {

    return <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-3xl font-bold text-white">My Account</h2>}
        >
            <div>
                <div className="space-y-6">

                    <PersonalCard user={props.auth.user} />

                    <UpdatePasswordCard user={props.auth.user} />

                    <TwoFactorSecurityCard user={props.auth.user} />

                    <BrowserSessionsCard sessions={props.sessions} />

                    <DeleteAccountCard user={props.user} />

                </div>

            </div>
        </Authenticated>
    </>
}
