export class Menu {
    //Menu Mode : horizontal or vertical
    public static MenuMode = "vertical";

    //Menu Items
    public static readonly items: any = [
        {
            name: 'Spatiu Personal',
            target: '',
            icon: 'fa fa-user',
            childs: [
                {
                    name: 'Modifica Profil',
                    target: '',
                    icon: 'fa fa-user'
                },
                {
                    name: 'Rapoarte',
                    target: '',
                    icon: 'glyphicon glyphicon-list-alt'
                }
            ]
        },
        {
            name: 'Documente',
            target: '',
            icon: 'fa fa-folder',
            childs: [
                {
                    name: 'Management',
                    target: '/documents',
                    icon: 'fa fa-folder'
                }
            ]
        },
        {
            name: 'Registratura',
            target: '',
            icon: 'fa fa-edit',
            childs: [
                {
                    name: 'Inregistrare Documente',
                    target: '',
                    icon: 'fa fa-plus'
                },
                {
                    name: 'Documente Inregistrate',
                    target: '',
                    icon: 'fa fa-file-text'
                },
                {
                    name: 'Inregistrare Dosare',
                    target: '',
                    icon: 'fa fa-folder'
                },
                {
                    name: 'Raport Registratura',
                    target: '',
                    icon: 'fa fa-list'
                },
                {
                    name: 'Statistici de lucru',
                    target: '',
                    icon: 'fa fa-list'
                }
            ]
        },
        {
            name: 'Activitati',
            target: '',
            icon: 'fa fa-building-o',
            childs: [
                {
                    name: 'Activitatile mele curente',
                    target: '',
                    icon: 'fa fa-building-o'
                },
                {
                    name: 'Activitatile mele incheiate',
                    target: '',
                    icon: 'fa fa-building-o'
                },
                {
                    name: 'Activitatile utilizatorilor',
                    target: '',
                    icon: 'fa fa-building-o'
                }
            ]
        },
        {
            name: 'Rapoarte',
            target: '',
            icon: 'fa fa-building-o',
            childs: [
                {
                    name: ' Raport-Fluxuri de lucru',
                    target: '',
                    icon: 'fa fa-building-o'
                }
            ]
        },
        {
            name: 'Administrare',
            target: '',
            icon: 'fa fa-cogs',
            childs: [
                {
                    name: 'Documente',
                    target: '',
                    icon: 'fa fa-folder'
                },
                {
                    name: 'Utilizatori',
                    target: '/administration/users',
                    icon: 'fa fa-users'
                },
                {
                    name: 'Fluxuri de lucru',
                    target: '',
                    icon: 'fa fa-undo'
                },
                {
                    name: 'Optiuni',
                    target: '',
                    icon: 'fa fa-cog'
                }
            ]
        }
    ]
}