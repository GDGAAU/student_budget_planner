import { FaCar } from 'react-icons/fa';

export default function TransportationCard() {
  return (
    <div className="bg-white p-6 my-4 rounded-2xl shadow-lg w-full max-w-sm">
      {/* Icon & Title */}
      <div className="flex items-center space-x-4">
        <div className="bg-red-100 p-3 rounded-full">
          {/* <FaCar className="text-red-500 text-2xl" /> */}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Transportation</h3>
          <p className="text-gray-500 text-sm">$20 Per day</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium bg-red-400 px-3 py-1 rounded-full">
            $500.00
          </span>
          <span className="text-gray-700 text-sm font-medium">$1000.00</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-red-400 rounded-full"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
