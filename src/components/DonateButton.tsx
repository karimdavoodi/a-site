`use client`

export const DonateButton = () => {
  


    return (
    <button style={styles.donateButton} >Donate</button>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
  donateButton: {
    padding: '3px 12px',
    backgroundColor: 'var(--gold)',
    color: 'var(--deep-green)',
    border: 'none',
    borderRadius: '3px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    marginLeft: '5rem',
    cursor: 'pointer',
  },

}