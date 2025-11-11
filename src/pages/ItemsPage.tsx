import React from 'react';
import { 
  BsBook, 
  BsCup, 
  BsDroplet,
  BsLightning
} from 'react-icons/bs';
import { 
  MdOilBarrel, 
  MdLocalBar, 
  MdBakeryDining 
} from 'react-icons/md';

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  icon: string;
  quantity: number;
}

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  BsBook,
  MdOilBarrel,
  BsCup,
  BsDroplet,
  MdLocalBar,
  MdBakeryDining,
  BsLightning
};

interface ItemCardProps {
  item: Item;
  onUse: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onUse }) => {
  const IconComponent = iconMap[item.icon];
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'comum': return 'border-gray-400';
      case 'raro': return 'border-blue-500';
      case 'epico': return 'border-purple-500';
      case 'legendario': return 'border-yellow-500';
      case 'divino': return 'border-red-500';
      case 'sagrado': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className={`card border-l-4 ${getRarityColor(item.rarity)} relative`}>
      <div className="flex items-start space-x-3">
        <div className="text-spiritual text-3xl">
          {IconComponent && <IconComponent size={36} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-sm font-bold bg-gray-100 px-2 py-1 rounded">
              {item.quantity}x
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          
          {item.type === 'consumivel' && (
            <button
              onClick={() => onUse(item.id)}
              className="btn-victory text-sm px-3 py-1"
              disabled={item.quantity === 0}
            >
              Usar
            </button>
          )}
          
          {item.type === 'equipavel' && (
            <div className="text-sm text-spiritual font-medium">
              Equipado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ItemsPage: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([
    {
      id: 'biblia_sagrada',
      name: 'Bíblia Sagrada',
      description: 'A Palavra de Deus que ilumina o caminho',
      type: 'equipavel',
      rarity: 'sagrado',
      icon: 'BsBook',
      quantity: 1
    },
    {
      id: 'oleo_uncao',
      name: 'Óleo de unção', 
      description: 'Óleo consagrado para cura espiritual',
      type: 'consumivel',
      rarity: 'raro',
      icon: 'MdOilBarrel',
      quantity: 4
    },
    {
      id: 'calice_sagrado',
      name: 'Cálice sagrado',
      description: 'Cálice da Nova Aliança',
      type: 'consumivel',
      rarity: 'legendario',
      icon: 'BsCup',
      quantity: 1
    },
    {
      id: 'agua_vida',
      name: 'Água da vida',
      description: 'Água viva que sacia para sempre',
      type: 'consumivel',
      rarity: 'raro', 
      icon: 'BsDroplet',
      quantity: 1
    },
    {
      id: 'sangue_cristo',
      name: 'Sangue de Cristo',
      description: 'O sangue que purifica de todo pecado',
      type: 'consumivel',
      rarity: 'divino',
      icon: 'MdLocalBar',
      quantity: 1
    },
    {
      id: 'corpo_cristo',
      name: 'Corpo de Cristo',
      description: 'O pão da vida eterna',
      type: 'consumivel',
      rarity: 'divino',
      icon: 'MdBakeryDining',
      quantity: 2
    },
    {
      id: 'espada_espirito',
      name: 'Espada do Espírito',
      description: 'A Palavra de Deus é viva e eficaz',
      type: 'equipavel',
      rarity: 'epico',
      icon: 'BsLightning',
      quantity: 1
    }
  ]);

  const handleUseItem = (itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    console.log(`Usando item: ${itemId}`);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-bold text-dark mb-2">
          Itens Sagrados
        </h1>
        <p className="text-gray-600">
          Seu inventário de bênçãos divinas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onUse={handleUseItem}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Legenda de Raridade</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-gray-400"></div>
            <span>Comum</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-blue-500"></div>
            <span>Raro</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-purple-500"></div>
            <span>Épico</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-yellow-500"></div>
            <span>Lendário</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-red-500"></div>
            <span>Divino</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-green-500"></div>
            <span>Sagrado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;