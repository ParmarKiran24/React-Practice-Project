"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { getNextStep, getPreviousStep, getStepProgress, PROFILE_STEPS } from "@/lib/profileFlow";

interface ProfileNavigationProps {
  onNext?: () => Promise<boolean> | boolean; // Return true to proceed
  onPrevious?: () => void;
  showProgress?: boolean;
}

export default function ProfileNavigation({
  onNext,
  onPrevious,
  showProgress = true,
}: ProfileNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);

  const currentStep = PROFILE_STEPS.find(step => step.path === pathname);
  const progress = getStepProgress(pathname);
  const nextPath = getNextStep(pathname);
  const prevPath = getPreviousStep(pathname);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const canProceed = onNext ? await onNext() : true;
      if (canProceed && nextPath) {
        router.push(nextPath);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
    if (prevPath) {
      router.push(prevPath);
    }
  };

  const handleSaveExit = () => {
    router.push("/dashboard");
  };

  return (
    <Box>
      {showProgress && (
        <Box mb={6}>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" fontWeight={600}>
              {currentStep?.title || "Application Progress"}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {progress}% Complete
            </Text>
          </Flex>
          <Box
            w="100%"
            h="8px"
            bg="gray.200"
            borderRadius="full"
            overflow="hidden"
          >
            <Box
              h="100%"
              w={`${progress}%`}
              bg="green.500"
              transition="width 0.3s"
            />
          </Box>
        </Box>
      )}

      <Flex justify="space-between" align="center" mt={8} pt={6} borderTop="1px solid" borderColor="gray.200">
        <Button
          variant="ghost"
          onClick={handleSaveExit}
          disabled={isLoading}
        >
          Save & Exit
        </Button>

        <Flex gap={3}>
          {prevPath && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isLoading}
            >
              Previous
            </Button>
          )}

          {nextPath && (
            <Button
              colorScheme="brand"
              onClick={handleNext}
              loading={isLoading}
            >
              {nextPath.includes("payment") ? "Proceed to Payment" : "Next"}
            </Button>
          )}

          {!nextPath && pathname === "/profile/summary" && (
            <Button
              colorScheme="brand"
              onClick={handleNext}
              loading={isLoading}
            >
              Submit & Pay
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
