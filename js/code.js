// class 0 search github

// class 1 table date
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()
    }

    load(){
        this.entries = [
            {
            login: 'jefmaeda',
            name: "Jef Maeda",
            public_repos: '100',
            followers: '100',
            },
            {
                login: 'may',
                name: "may",
                public_repos: '10056',
                followers: '1500',
                },
        ]
    }
}

//class 2 view table
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.update()
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = 
            `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt =
            `Image of ${user.name}`
            row.querySelector('a').href = 
            `https://github.com/${user.login}`
            row.querySelector('p').textContent = user.name
            row.querySelector('span').textContent = user.login
            row.querySelector('.repository').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            //push create html
            this.tbody.append(row)
        })
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr')
        .forEach( (tr) => {
            tr.remove()
        });
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML =`
        <td class="user">
            <img src="https://github.com/jefmaeda.png" alt="">
            <a href="https://github.com/jefmaeda" target="_blank">
                <p>Jef Maeda</p>
                /<span>jefmaeda</span>
            </a>
        </td>
        <td class="repository">72</td>
        <td class="followers">72</td>
        <td>
            <button class="remove">Remove</button>
        </td>
        `

        return tr
    }
}