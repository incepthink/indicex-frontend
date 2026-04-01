import { motion } from "framer-motion";

const BuiltOnBase = () => {
  return (
    <section className="relative bg-page-bg py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
        style={{ backgroundColor: "#0052FF" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Base logo mark */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{ backgroundColor: "#0052FF" }}
          >
            <svg
              viewBox="0 0 111 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"
                fill="white"
              />
            </svg>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Built on <span style={{ color: "#0052FF" }}>Base</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-lg leading-relaxed mb-10">
            Powered by Coinbase's L2 — fast, secure, and low-cost.
            <br />
            Ethereum security with sub-cent transaction fees.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: "<$0.01", label: "Per Transaction" },
              { value: "2s", label: "Block Time" },
              { value: "100%", label: "EVM Compatible" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-xs text-text-secondary mt-1 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltOnBase;
