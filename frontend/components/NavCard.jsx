'use client';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CategoryIcon from '@material-ui/icons/Category';

const img = {
  Home: <HomeIcon style={{ fontSize: 30 }} />,
  Budget: <AttachMoneyIcon style={{ fontSize: 30 }} />,
  Transactions: <ReceiptIcon style={{ fontSize: 30 }} />,
  Categories: <CategoryIcon style={{ fontSize: 30 }} />,
};

const NavCard = ({ title, onClick }) => {
  return (
    <div
      className="flex gap-3"
      style={{
        padding: '10px 15px',
        margin: '10px 0',
        backgroundColor: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: '500',
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
    >
      {img[title]}
      {title}
    </div>
  );
};

export default NavCard;
