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
                    <div>Sector: {{selectSector.name}}</div>
                    <div>Category: {{selectCategory.about}}</div>
                    <div>Linea: {{selectLinea.name}}</div>
                    <div>selectSeat: {{selectSeat.seat}}</div>






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
            }
        },

        props: [
            'categories',
            'lines',
            'seats',
            'sectors',
        ],

        computed: {
            cat() {
                const cat = [];
                _.each( this.categories, ( item ) => {
                    cat.push( item );
                } );
                return cat;
            },
            lin() {
                const lin = [];
                _.each( this.lines, ( item ) => {
                    lin.push( item );
                } );
                console.log( 'lines', lin );
                return lin;
            },
            seat() {
                const seat = [];
                _.each( this.seats, ( item ) => {
                    seat.push( item );
                } );
                console.log( 'seats', seat );
                return seat;
            },
            sect() {
                const sect = [];
                _.each( this.sectors, ( item ) => {
                    sect.push( item );
                } );
                console.log( 'sectors', sect );
                return sect;
            }
        },

        watch: {
            selectCategory( res ) {
                console.log( 'res category', res );
            },
            selectLinea( res ) {
                console.log( 'res linea', res );
            },
            selectSeat( res ) {
                console.log( 'res Seat', res );
            },
            selectSector( res ) {
                console.log( 'res sector', res );
            }


        }

    }

</script>

<style>

</style>