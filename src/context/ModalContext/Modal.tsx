// @ts-nocheck

import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

export const ModalContext = createContext<ModalStateContextProps>(
  {} as ModalStateContextProps
);
interface ModalStateContextProps {
  show: (constent: ReactNode, notifications?: boolean) => void;
  hide: () => void;
}

export const Modal: FC<ModalStateContextProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(<></>);

  const [notifications, setNotifications] = useState(false);

  const show = (content: ReactNode, notifications?: boolean) => {
    setContent(content);
    notifications && setNotifications(true);
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
    setNotifications(false);
  };

  useEffect(() => {
    console.log("MODAL CONTEXT");
  }, []);

  const providerValues = {
    show,
    hide,
  };

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "1px",
      opacity: 1,
      transition: { delay: 0.2 },
    },
  };

  const renderModalWindow = (
    <AnimatePresence>
      {isVisible ? (
        <>
          {!notifications ? (
            <motion.div
              id="modal-wrapper"
              style={{
                width: isVisible ? "100%" : 0,
                height: isVisible ? "100%" : 0,
                backgroundColor: "rgba(49, 49, 49, 0.7)",
                position: "absolute",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                variants={modal}
              >
                {content}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              id={"notif"}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex",
                position: "absolute",
                zIndex: 10,
                marginTop: 50,
                right: 20,
              }}
              initial="hidden"
              transition={{ delay: 0.2 }}
              animate="visible"
              variants={backdrop}
            >
              {content}
            </motion.div>
          )}
        </>
      ) : (
        <div />
      )}
    </AnimatePresence>
  );
  return (
    <ModalContext.Provider value={providerValues}>
      {renderModalWindow}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};
