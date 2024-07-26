const storedLocalUserID = localStorage.getItem('userID');
const storedSessionUserID = sessionStorage.getItem('userID');

const CLASS_Contactcards = document.querySelector('.Contactcards');
const contacts = {
    'a': [
        {
            'name': 'Ava Adams',
            'email': 'ava.adams@example.com',
            'tel': '00309032111'
        },
        {
            'name': 'Alex Anderson',
            'email': 'alex.anderson@example.com',
            'tel': '00309032222'
        }
    ],
    'b': [
        {
            'name': 'Bella Brown',
            'email': 'bella.brown@example.com',
            'tel': '00309033333'
        },
        {
            'name': 'Benjamin Brooks',
            'email': 'benjamin.brooks@example.com',
            'tel': '00309033444'
        }
    ],
    'c': [
        {
            'name': 'Charlie Clark',
            'email': 'charlie.clark@example.com',
            'tel': '00309034555'
        },
        {
            'name': 'Camila Cruz',
            'email': 'camila.cruz@example.com',
            'tel': '00309034666'
        }
    ],
    'd': [
        {
            'name': 'David Davis',
            'email': 'david.davis@example.com',
            'tel': '00309035777'
        },
        {
            'name': 'Diana Diaz',
            'email': 'diana.diaz@example.com',
            'tel': '00309035888'
        }
    ],
    'e': [
        {
            'name': 'Emily Evans',
            'email': 'emily.evans@example.com',
            'tel': '00309036999'
        },
        {
            'name': 'Ethan Edwards',
            'email': 'ethan.edwards@example.com',
            'tel': '00309037000'
        }
    ],
    'f': [
        {
            'name': 'Florence Foster',
            'email': 'florence.foster@example.com',
            'tel': '00309038111'
        },
        {
            'name': 'Frank Franklin',
            'email': 'frank.franklin@example.com',
            'tel': '00309038222'
        }
    ],
    'g': [
        {
            'name': 'Gabriella Garcia',
            'email': 'gabriella.garcia@example.com',
            'tel': '00309039333'
        },
        {
            'name': 'George Gray',
            'email': 'george.gray@example.com',
            'tel': '00309039444'
        }
    ],
    'h': [
        {
            'name': 'Hannah Hall',
            'email': 'hannah.hall@example.com',
            'tel': '00309040555'
        },
        {
            'name': 'Henry Harris',
            'email': 'henry.harris@example.com',
            'tel': '00309040666'
        }
    ],
    'i': [
        {
            'name': 'Isabella Ingram',
            'email': 'isabella.ingram@example.com',
            'tel': '00309041777'
        },
        {
            'name': 'Ian Irving',
            'email': 'ian.irving@example.com',
            'tel': '00309041888'
        }
    ],
    'j': [
        {
            'name': 'Julia Jenkins',
            'email': 'julia.jenkins@example.com',
            'tel': '00309042999'
        },
        {
            'name': 'Jason Johnson',
            'email': 'jason.johnson@example.com',
            'tel': '00309043000'
        }
    ],
    'k': [
        {
            'name': 'Kate Kennedy',
            'email': 'kate.kennedy@example.com',
            'tel': '00309044111'
        },
        {
            'name': 'Kevin Kelly',
            'email': 'kevin.kelly@example.com',
            'tel': '00309044222'
        }
    ],
    'l': [
        {
            'name': 'Lauren Lee',
            'email': 'lauren.lee@example.com',
            'tel': '00309045333'
        },
        {
            'name': 'Lucas Lewis',
            'email': 'lucas.lewis@example.com',
            'tel': '00309045444'
        }
    ],
    'm': [
        {
            'name': 'Mia Martin',
            'email': 'mia.martin@example.com',
            'tel': '00309046555'
        },
        {
            'name': 'Matthew Mitchell',
            'email': 'matthew.mitchell@example.com',
            'tel': '00309046666'
        }
    ],
    'n': [
        {
            'name': 'Natalie Nelson',
            'email': 'natalie.nelson@example.com',
            'tel': '00309047777'
        },
        {
            'name': 'Nathan Norris',
            'email': 'nathan.norris@example.com',
            'tel': '00309047888'
        }
    ],
    'o': [
        {
            'name': 'Olivia Owens',
            'email': 'olivia.owens@example.com',
            'tel': '00309048999'
        },
        {
            'name': 'Oscar Ortiz',
            'email': 'oscar.ortiz@example.com',
            'tel': '00309049000'
        }
    ],
    'p': [
        {
            'name': 'Penelope Parker',
            'email': 'penelope.parker@example.com',
            'tel': '00309050111'
        },
        {
            'name': 'Paul Peterson',
            'email': 'paul.peterson@example.com',
            'tel': '00309050222'
        }
    ],
    'q': [
        {
            'name': 'Quinn Quinn',
            'email': 'quinn.quinn@example.com',
            'tel': '00309051333'
        },
        {
            'name': 'Quincy Quinn',
            'email': 'quincy.quinn@example.com',
            'tel': '00309051444'
        }
    ],
    'r': [
        {
            'name': 'Rachel Roberts',
            'email': 'rachel.roberts@example.com',
            'tel': '00309052555'
        },
        {
            'name': 'Ryan Russell',
            'email': 'ryan.russell@example.com',
            'tel': '00309052666'
        }
    ],
    's': [
        {
            'name': 'Sophia Smith',
            'email': 'sophia.smith@example.com',
            'tel': '00309053777'
        },
        {
            'name': 'Samuel Sanchez',
            'email': 'samuel.sanchez@example.com',
            'tel': '00309053888'
        }
    ],
    't': [
        {
            'name': 'Taylor Thompson',
            'email': 'taylor.thompson@example.com',
            'tel': '00309054999'
        },
        {
            'name': 'Thomas Torres',
            'email': 'thomas.torres@example.com',
            'tel': '00309055000'
        }
    ],
    'u': [
        {
            'name': 'Uma Underwood',
            'email': 'uma.underwood@example.com',
            'tel': '00309056111'
        },
        {
            'name': 'Ulysses Upton',
            'email': 'ulysses.upton@example.com',
            'tel': '00309056222'
        }
    ],
    'v': [
        {
            'name': 'Victoria Vaughn',
            'email': 'victoria.vaughn@example.com',
            'tel': '00309057333'
        },
        {
            'name': 'Vincent Vega',
            'email': 'vincent.vega@example.com',
            'tel': '00309057444'
        }
    ],
    'w': [
        {
            'name': 'Wendy Williams',
            'email': 'wendy.williams@example.com',
            'tel': '00309058555'
        },
        {
            'name': 'William Wilson',
            'email': 'william.wilson@example.com',
            'tel': '00309058666'
        }
    ],
    'x': [
        {
            'name': 'Xena Xavier',
            'email': 'xena.xavier@example.com',
            'tel': '00309059777'
        },
        {
            'name': 'Xander Xenos',
            'email': 'xander.xenos@example.com',
            'tel': '00309059888'
        }
    ],
    'y': [
        {
            'name': 'Yara Young',
            'email': 'yara.young@example.com',
            'tel': '00309060999'
        },
        {
            'name': 'Yusuf York',
            'email': 'yusuf.york@example.com',
            'tel': '00309061000'
        }
    ],
    'z': [
        {
            'name': 'Zoe Zimmerman',
            'email': 'zoe.zimmerman@example.com',
            'tel': '00309062111'
        },
        {
            'name': 'Zachary Zane',
            'email': 'zachary.zane@example.com',
            'tel': '00309062222'
        }
    ]
}

async function betta() {
    let userID;
    const contact = {
        'name': 'Ava Adams',
        'email': 'ava.adams@example.com',
        'tel': '00309032111'
    };
    if (storedLocalUserID) { userID = storedLocalUserID; }
    else if (storedSessionUserID) { userID = storedSessionUserID; }
    else { throw new Error('Es ist ein Problem aufgetreten!'); }
    await uploadPatchData(userID, contact);
}

function initBetta() {
    betta();
    renderContact();
    renderCards();
}

function renderContact() { }

function renderCards() {
    const carts = CLASS_Contactcards;
    carts.innerHTML = '';
    Object.keys(contacts).forEach(key => {
        carts.innerHTML += `
            <div class="letter">${key.toUpperCase()}</div>
            <div class="ContactcardsTrennline"></div>
        `;
        contacts[key].forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.innerHTML = `
                <div class="card">
                    <div id="nameShortcut" style="background-color: rgb(255, 112, 16)">${contact.name.split(' ').map(namePart => namePart[0]).join('').toUpperCase()}</div>
                    <div class="namemail">
                    <p>${contact.name}</p>
                    <a href="#Mail">${contact.email}</a>
                </div>`;
            carts.appendChild(contactElement);
        });
    });
}

function addContact() { }
function editContact() { }
function delContact() { }