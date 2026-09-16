export default function TricolorBar({ heightClass = "h-1" }) {
    return (
        <div className={`flex w-full ${heightClass}`}>
            <span className="flex-1 bg-saffron" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-success" />
        </div>
    );
}