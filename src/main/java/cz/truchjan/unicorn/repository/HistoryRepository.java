package cz.truchjan.unicorn.repository;

import cz.truchjan.unicorn.model.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {

	List<History> findAllByLinkId(Long linkId);
}
