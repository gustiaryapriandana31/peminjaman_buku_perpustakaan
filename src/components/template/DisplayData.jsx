import DashboardTemplate from "./DashboardTemplate";

export default function DisplayData({title, children}) {
    return (
        <DashboardTemplate title={title}>
        <section className="max-w-3xl mx-auto">
            {children}
        </section>
        </DashboardTemplate>
    );
}
