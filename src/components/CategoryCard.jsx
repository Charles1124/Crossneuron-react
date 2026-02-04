import '/src/styles/home.css'

const CategoryCard = ({ icon: Icon, title, description, color, delay = 0 }) => {
    return (
        <div className="category-card" style={{ animationDelay: `${delay}ms` }}>
            <div className={`category-icon-wrapper ${color}`}>
                <Icon className="category-icon" size={20}/>
            </div>
            <h3>{title}</h3> 
            <p>{description}</p>
        </div>
    )
}

export default CategoryCard;