const PublicLayout = ({
    children
}:{children: React.ReactNode;})=>{
    return(
        <div className="h-content dark:bg-[#1F1F1F]">
            {children}
        </div>
    );
};

export default PublicLayout;