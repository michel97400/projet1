const MockUsers = [
    {
        nom: 'Payet',
        prenom: 'Michel',
        telephone: '0692 13 17 21',
        role: 'user',
        creeLe: '2024-02-05',
        location: 'Reunion'
    }
]


function Users({ name = "Jean Dupont", email = "jean.dupont@example.com", role = "utilisateur", avatar }) {
    return (
        <div className="card-users">
            <div className="card-avatar">
                <img src={avatar || "https://i.pravatar.cc/100"} alt="Avatar utilisateur" />
            </div>
            <div className="card-info">
                <span className="role">{role}</span>
            </div>
            <div>
                {MockUsers.map((key) =>
                <ul>
                    <li>{key.nom}</li>
                    <li>{key.prenom}</li>
                    <li>{key.telephone}</li>
                    <li>{key.location}</li>
                </ul>)}
            </div>
        </div>
    );
}

export default Users;
