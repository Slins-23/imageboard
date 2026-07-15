import Button from "@/ui/components/Buttons/Button/Button";
import pageStyle from "./page.module.css";

export default function Delete() {
    return (
        <div className={pageStyle.pageWrapper}>
            <span className={pageStyle.title}>Delete</span>
            <div className={pageStyle.deleteSection}>
                <Button className={pageStyle.deleteBtn}>Delete account</Button>
            </div>
        </div>
    );
}
