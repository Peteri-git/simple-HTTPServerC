 var proxy={tmpProducts:[]};
 Vue.component('product-list',{
        template:`
        <div class="products"><div class="product" v-for="p in proxy.tmpProducts">
        <div class="name">{{p.name}}</div>
        <div><img :src="p.image" :width="p.width" :height="p.height"></div>
        <div class="price">cena:{{p.price}} kč</div>
        <div><button class ="button"@click="buy(p)">Koupit</button></div>
        </div></div>`,
        data: function(){
            return {
                proxy:proxy,
                buyed:bought,
            }
        },
        
        methods:{
            buy:function(p){
                bought.push(new Bought(p.name,p.price,p.amount,p.staticprice))
            },
            }});

var change=true;

allProducts=[];
proxy.tmpProducts = allProducts;
Phones=[];
Cars=[];
Weapons=[];
bought=[];
allProducts.push(new Produkt("Samsung","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=SAMO0157c&i=1.jpg",200,"auto",19000,1,19000));
allProducts.push(new Produkt("HUAWEI černý","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU2921b1&i=1.jpg",200,"auto",7000,1,7000));
allProducts.push(new Produkt("HUAWEI fialový","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU3127b2&i=1.jpg",200,"auto",10000,1,10000));
allProducts.push(new Produkt("HUAWEI fialový 2","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU3127b2&i=1.jpg",200,"auto",10000,1,10000));
allProducts.push(new Produkt("Volkswagen","https://i.ebayimg.com/00/s/MTAyNFgxMzg3/z/s~QAAOSwuJRb9m-X/$_46.JPG",200,175,5000,1,5000))
allProducts.push(new Produkt("Mercedes","https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/wRMAAOSwj-BbHs50/$_46.JPG",200,175,10000,1,10000))
allProducts.push(new Produkt("Zbraň 1","https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/AK-47_type_II_Part_DM-ST-89-01131.jpg/1200px-AK-47_type_II_Part_DM-ST-89-01131.jpg",200,175,7500,1,7500))
allProducts.push(new Produkt("Zbraň 2","https://www.armed.cz/data/images/products/134529/five-seven_rotators_3-1800x1275-1544205996.jpg",200,175,4500,1,4500))

Phones.push(new Produkt("Samsung","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=SAMO0157c&i=1.jpg",200,"auto",19000,1,19000));
Phones.push(new Produkt("HUAWEI černý","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU2921b1&i=1.jpg",200,"auto",7000,1,7000));
Phones.push(new Produkt("HUAWEI fialový","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU3127b2&i=1.jpg",200,"auto",10000,1,10000));
Phones.push(new Produkt("HUAWEI fialový 2","https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=HU3127b2&i=1.jpg",200,"auto",10000,1,10000));

Weapons.push(new Produkt("Zbraň 1","https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/AK-47_type_II_Part_DM-ST-89-01131.jpg/1200px-AK-47_type_II_Part_DM-ST-89-01131.jpg",200,175,7500,1,7500))
Weapons.push(new Produkt("Zbraň 2","https://www.armed.cz/data/images/products/134529/five-seven_rotators_3-1800x1275-1544205996.jpg",200,175,4500,1,4500))

Cars.push(new Produkt("Volkswagen","https://i.ebayimg.com/00/s/MTAyNFgxMzg3/z/s~QAAOSwuJRb9m-X/$_46.JPG",200,175,5000,1,5000))
Cars.push(new Produkt("Mercedes","https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/wRMAAOSwj-BbHs50/$_46.JPG",200,175,10000,1,10000))
Vue.component('over',{
    template:`<div class="buyed"><button class="Empty"@click="Empty()">Vyprázdnit košík</button><div class="bought" v-for="p in buyed">
    <div><button @click="add(p)">+</button><button @click="remove(p)">-</button>{{p.amount}}x {{p.name}}</div>
    <div>cena: {{p.price}} kč</div>
    <div><img :src="p.image" :width="p.width" :height="p.height"></div>
    </div><div>Celková Cena:{{FullPrice(buyed)}}kč</div>
    <button class="button" onclick="location.href='https://www.youtube.com/watch?v=z-nfbDXTiHg';">Objednat</button>
    </div>
    `,
    data: function(){
        return {
            buyed:bought
        }
    },
    methods:{
        remove:function(p){
           
            p.amount--;
            p.price-=p.staticprice;
            if(p.amount<=0){
               p.amount=1;
               p.price=p.staticprice;
            }
            
        },
        add:function(p){
            p.amount++;
            p.price+=p.staticprice;
        },
        Empty:function(){
            bought.splice(0,bought.length)
        },
        FullPrice:function(bought){
            var fagot = 0;
           for (let i = 0; i < bought.length; i++) {
              fagot +=bought[i].price;
           }
           return fagot;
        }
        
    }
})
Vue.component('buttons',{
    template:`
    <div id ="Categories">
    <button type="button" class ="button" @click="all()">Všechno</button>
    <button type="button" class ="button" @click="phone()">Mobily</button>
    <button type="button" class ="button" @click="car()">Auta</button>
    <button type="button" class ="button" @click="weapon()">Zbraně</button>
    </div>
    
    `,
    methods:{
        car:function()
        {
            Vue.set(proxy,'tmpProducts',Cars);
        },
        phone:function()
        {
            Vue.set(proxy,'tmpProducts',Phones);
        },
        weapon:function()
        {
            Vue.set(proxy,'tmpProducts',Weapons);
            proxy.tmpProducts = Weapons;
        },
        all:function()
        {
            proxy.tmpProducts = allProducts;
        }
    }
    

})


