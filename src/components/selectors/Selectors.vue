<template>
    <div>
        <div class="container text-left">
            <div class="row">
                <div class="col-sm-12 col-md-6">

                    <h3>Select your ticket</h3>

                    <b>Sector</b>
                    <select v-model="selectSector" class="custom-select mb-3">
                        <option :key="index" v-for="(sector, index) of sect" :value="sector">
                            {{sector.name}}
                        </option>
                    </select>

                    <b>Category</b>
                    <select
                            :disabled="!selectSector || seat.length === 0"
                            v-model="selectCategory" class="custom-select mb-3">
                        <option :key="index" v-for="(sector, index) of cat" :value="sector">
                            {{sector.about}} ({{sector.price}})
                        </option>
                    </select>

                    <b>Linea</b>
                    <select
                            :disabled="!selectSector || !selectCategory || seat.length === 0"
                            v-model="selectLinea" class="custom-select mb-3">
                        <option :key="index" v-for="(linea, index) of lin" :value="linea">
                            {{linea.name}}
                        </option>
                    </select>

                    <b>Seat</b>
                    <select
                            :disabled="!selectSector || !selectCategory || !selectLinea || seat.length === 0"
                            v-model="selectSeat" class="custom-select mb-3">
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
                    <div>Seat: {{selectSeat.seat}}</div>

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
                startLine: [],
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
            this.startLine = _.cloneDeep( this.lin );

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

            getUnic(seats, type, startData){
                const unic = _.unionBy( seats, type );
                const arr = [];
                _.each( unic, ( item ) => {
                    arr.push( _.find( startData, it => it.id === item[type] ) )
                } );
                return arr;
            },


            getAllSeatsInThisSector( sector ) {
                return _.filter( this.starSeat, seat => sector.id === seat.sector && seat.status === 0 );
            },


            getAllSeatsInThisSectorAndCategory( sector, category ) {
                return _.filter( this.starSeat, ( seat ) => {
                    return category.id === seat.category && seat.status === 0 && sector.id === seat.sector;
                } );
            },

            checkSeats() {
                if ( this.seat.length === 0 ) {
                    setTimeout( () => {
                        alert( 'мест нет !!!' );
                    }, 100 )

                }
            }
        },

        watch: {
            selectSector( sector ) {
                this.selectCategory = '';
                this.selectLinea = '';
                this.selectSeat = '';
                this.seat = _.cloneDeep( this.getAllSeatsInThisSector( sector ) );
                this.checkSeats();
                if(this.seat.length > 0){
                    this.cat = this.getUnic( this.seat, 'category', this.startCat );
                }


            },

            selectCategory( category ) {
                if ( category ) {
                    this.selectLinea = '';
                    this.selectSeat = '';
                    this.seat = _.cloneDeep( this.getAllSeatsInThisSectorAndCategory( this.selectSector, category ) );
                    this.checkSeats();
                    if(this.seat.length > 0){
                        this.lin = this.getUnic( this.seat, 'line',  this.startLine);
                    }
                }
            },

            selectLinea( linea ) {
                if ( linea ) {
                    this.selectSeat = '';
                    this.seat = _.filter( this.starSeat, ( seat ) => {
                        return linea.id === seat.line
                            && this.selectCategory.id === seat.category
                            && seat.status === 0
                            && this.selectSector.id === seat.sector;
                    } );
                    this.checkSeats();
                }

            },
            selectSeat( res ) {
                console.log( 'res Seat', res );
            }

        }

    }

</script>

<style>

</style>