import { View, StyleSheet } from "react-native"
import { Tile, TileProps } from "../components/tile"

type Props = {
    tiles: Array<TileProps>;
}

const Dashboard = ({tiles} : Props) => {
    return (
        <View style={styles.tiles}>
            {
                tiles.map((tile: TileProps) => (
                    <Tile key={tile.text} {...tile} />
                ))
            }
        </View>
    )
}
const styles = StyleSheet.create({
 tiles: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: 'center',
 }
})
export { Dashboard }