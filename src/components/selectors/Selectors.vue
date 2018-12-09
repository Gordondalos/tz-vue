<template>
    <div>
        <div class="container text-left">
            <div class="row">
                <div class="col-sm-12 col-md-6">

                    <b>Sector</b>
                    <select v-model="selectSector" class="custom-select mb-3">
                        <option :key="index" v-for="(sector, index) of sect" :value="sector">
                            {{sector.name}}
                        </option>
                    </select>

                    <b>Category</b>
                    <select v-model="selectCategory" class="custom-select mb-3">
                        <option :key="index" v-for="(sector, index) of cat" :value="sector">
                            {{sector.about}} ({{sector.price}})
                        </option>
                    </select>

                    <b>Linea</b>
                    <select v-model="selectLinea" class="custom-select mb-3">
                        <option :key="index" v-for="(linea, index) of lin" :value="linea">
                            {{linea.name}}
                        </option>
                    </select>

                    <b>Seat</b>
                    <select v-model="selectSeat" class="custom-select mb-3">
                        <option :key="index" v-for="(se, index) of seat" :value="se">
                            {{se.seat}}
                        </option>
                    </select>

                </div>
                <div class="col-sm-12 col-md-6">

                    <h3>Selected</h3>
                    <div>Sector: {{selectSector.name}} ({{selectSector.id}})</div>
                    <div>Category: {{selectCategory.about}}</div>
                    <div>Linea: {{selectLinea.name}}</div>
                    <div>selectSeat: {{selectSeat.seat}}</div>

                    <button @click="save(selectSeat)" class="btn btn-sm btn-info mt-4">Сохранить</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                selectSector: '',
                selectCategory: '',
                selectLinea: '',
                selectSeat: '',
                sect: [],
                cat: [],
                lin: [],
                seat: [],

                startSect: [],
                startCat: [],
                startLin: [],
                starSeat: [],
            }
        },

        props: [
            'categories',
            'lines',
            'seats',
            'sectors',
        ],

        created() {

            _.each( this.sectors, ( item ) => {
                this.sect.push( item );
            } );
            this.startSect = _.cloneDeep( this.sect );

            _.each( this.categories, ( item ) => {
                this.cat.push( item );
            } );
            this.startCat = _.cloneDeep( this.cat );

            _.each( this.lines, ( item ) => {
                this.lin.push( item );
            } );
            this.startLin = _.cloneDeep( this.lin );

            _.each( this.seats, ( item ) => {
                this.seat.push( item );
            } );
            this.starSeat = _.cloneDeep( this.seat );

        },

        computed: {},

        methods: {
            save( seat ) {
                alert( seat.id );
            },

            getAllLine( seats ) {
                const unic = _.unionBy( seats, 'line' );
                const newLines = [];
                _.each( unic, ( item ) => {
                    newLines.push( _.find( this.startLin, it => it.id === item.line ) )
                } );
                return newLines;
            },

            getAllCategoryOnThisSector(seats){
                const unic = _.unionBy( seats, 'category' );
                const newCategorys = [];
                _.each( unic, ( item ) => {
                    newCategorys.push( _.find( this.startCat, it => it.id === item.category ) )
                } );
                return newCategorys;
            },

            getAllSeatsInThisSector(sector){
              return _.filter(this.starSeat, item => sector.id === item.sector);
            },


            getAllSeatsInThisSectorAndCategory( sector, category ) {
                return _.filter( this.seat, ( seat ) => {
                    return category.id === seat.category && seat.status === 0 && sector.id === seat.sector;
                } );
            }
        },

        watch: {
            selectSector( sector ) {
                this.seat = _.cloneDeep(this.getAllSeatsInThisSector(sector));
                this.cat = _.cloneDeep(this.getAllCategoryOnThisSector(this.seat));
            },

            selectCategory( category ) {
                this.seat = _.cloneDeep( this.getAllSeatsInThisSectorAndCategory( this.selectSector, category ) );
                if ( this.seat.length === 0 ) {
                    alert( 'мест нет !!!' );
                }
                this.lin = _.cloneDeep(this.getAllLine( this.seat ));

            },

            selectLinea( linea ) {
                this.seat = _.filter( this.seat, ( seat ) => {
                    return linea.id === seat.line
                        && this.selectCategory.id === seat.category
                        && seat.status === 0
                        && this.selectSector.id === seat.sector;
                } );
            },
            selectSeat( res ) {
                console.log( 'res Seat', res );
            }

        }

    }

</script>

<style>

</style>